-- NurvexThink — initial schema, RLS, grants, and storage.
-- Apply in Supabase → SQL Editor (paste + Run), or `supabase db push`.
-- Safe to re-run (idempotent): uses IF NOT EXISTS / DROP POLICY IF EXISTS.

-- ============================================================
-- Extensions
-- ============================================================
create extension if not exists pgcrypto; -- gen_random_uuid()

-- ============================================================
-- Helpers
-- ============================================================
-- Touch updated_at on UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- profiles  (one row per admin user; this app has no public signups)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Admin check used by RLS. SECURITY DEFINER (bypasses RLS to avoid recursion on
-- profiles) and kept in a private, non-exposed schema. Only ever reads the
-- caller's own row, so it leaks nothing. Executable by authenticated only.
-- Defined AFTER public.profiles exists so the SQL function body validates.
create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role in ('owner', 'admin')
  );
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

-- Create a profile automatically for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop policy if exists "profiles: self or admin can read" on public.profiles;
create policy "profiles: self or admin can read" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id or private.is_admin());

drop policy if exists "profiles: self can update" on public.profiles;
create policy "profiles: self can update" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- ============================================================
-- products
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text,
  description text,
  cover_image text,
  live_url text,
  repo_url text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
create index if not exists products_published_idx on public.products (published);
create index if not exists products_featured_idx on public.products (featured);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop policy if exists "products: public reads published" on public.products;
create policy "products: public reads published" on public.products
  for select to anon, authenticated
  using (published = true);

drop policy if exists "products: admin reads all" on public.products;
create policy "products: admin reads all" on public.products
  for select to authenticated
  using (private.is_admin());

drop policy if exists "products: admin writes" on public.products;
create policy "products: admin writes" on public.products
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- ============================================================
-- blog_posts
-- ============================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  author_id uuid references public.profiles (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;
create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_author_idx on public.blog_posts (author_id);

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

drop policy if exists "blog: public reads published" on public.blog_posts;
create policy "blog: public reads published" on public.blog_posts
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "blog: admin reads all" on public.blog_posts;
create policy "blog: admin reads all" on public.blog_posts
  for select to authenticated
  using (private.is_admin());

drop policy if exists "blog: admin writes" on public.blog_posts;
create policy "blog: admin writes" on public.blog_posts
  for all to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- ============================================================
-- orders  (custom-software leads)
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  budget text,
  details text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  constraint orders_name_len check (char_length(name) between 1 and 200),
  constraint orders_email_len check (char_length(email) between 3 and 320),
  constraint orders_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint orders_details_len check (char_length(details) between 1 and 5000)
);

alter table public.orders enable row level security;
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Anyone may submit a lead; the table CHECK constraints validate it.
drop policy if exists "orders: public can insert" on public.orders;
create policy "orders: public can insert" on public.orders
  for insert to anon, authenticated
  with check (true);

-- Only admins can read or update leads. No public read; no delete.
drop policy if exists "orders: admin reads" on public.orders;
create policy "orders: admin reads" on public.orders
  for select to authenticated
  using (private.is_admin());

drop policy if exists "orders: admin updates" on public.orders;
create policy "orders: admin updates" on public.orders
  for update to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- ============================================================
-- Grants (new public tables are NOT auto-exposed to the Data API as of
-- 2026-04-28, so grant the API roles explicitly. RLS still governs rows.)
-- ============================================================
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;

grant select, update on public.profiles to authenticated;

-- ============================================================
-- Storage buckets + policies (public read, admin write)
-- If these storage statements error in your project, create the two buckets
-- in Storage → Buckets (public) and add the same policies via the UI instead.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true), ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "images: public read" on storage.objects;
create policy "images: public read" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('product-images', 'blog-images'));

drop policy if exists "images: admin insert" on storage.objects;
create policy "images: admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('product-images', 'blog-images') and private.is_admin());

drop policy if exists "images: admin update" on storage.objects;
create policy "images: admin update" on storage.objects
  for update to authenticated
  using (bucket_id in ('product-images', 'blog-images') and private.is_admin())
  with check (bucket_id in ('product-images', 'blog-images') and private.is_admin());

drop policy if exists "images: admin delete" on storage.objects;
create policy "images: admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('product-images', 'blog-images') and private.is_admin());
