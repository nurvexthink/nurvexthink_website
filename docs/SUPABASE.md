# Supabase Backend — Setup

This covers applying the database schema and connecting the site to it. Project ref:
`axbsghyqhhdaiylcksbv` · API URL: `https://axbsghyqhhdaiylcksbv.supabase.co`.

## 1. Apply the schema

1. Open the dashboard → **SQL Editor** → **New query**:
   <https://supabase.com/dashboard/project/axbsghyqhhdaiylcksbv/sql/new>
2. Paste the entire contents of [`supabase/migrations/0001_initial_schema.sql`](../supabase/migrations/0001_initial_schema.sql) and click **Run**.
3. It's safe to re-run. If the **storage** statements at the bottom error (some projects
   restrict SQL on the `storage` schema), create two **public** buckets named
   `product-images` and `blog-images` under **Storage → Buckets** instead, and add the same
   read/write policies in the Storage UI.

This creates the `profiles`, `products`, `blog_posts`, and `orders` tables with Row Level
Security, the API-role grants, indexes, and the storage buckets.

## 2. Get the anon key and set env vars

1. Dashboard → **Project Settings → API** → copy the **anon / public** key.
2. **Local:** create `.env.local` (copy from `.env.example`) and set:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://axbsghyqhhdaiylcksbv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<the anon key>
   ```
3. **Production (Vercel):** Project → Settings → Environment Variables → add the same two,
   then redeploy. (The `anon` key is public-safe — RLS protects the data. Never add the
   `service_role` key to client/`NEXT_PUBLIC_` vars.)

## 3. Create the admin users (for later)

The order form needs no login. Admin **reads** (and the future dashboard) require an admin
account. Under **Authentication → Users**, add the three admins
(`nurvexthink@gmail.com`, `fatima.abdulraheemdev.17@gmail.com`, `muhammadalidev3@gmail.com`).
A `profiles` row with `role = 'admin'` is created automatically by a trigger; promote one to
`owner` if you like:
```sql
update public.profiles set role = 'owner' where email = 'fatima.abdulraheemdev.17@gmail.com';
```

## 4. Verify

1. With the env vars set, run `npm run dev` and open **/order**.
2. Submit the form. You should land on the "Request received" confirmation.
3. In the dashboard → **Table Editor → orders**, the new lead row appears.

If submissions say "not connected yet," the anon key isn't set in that environment.

## What's wired now vs next

- **Now:** schema + RLS + storage; the **Order form saves real leads** to `orders` (validated
  server-side, with a honeypot). Products/blog still render from `src/lib/content.ts`.
- **Next milestone:** admin login + dashboard to manage products/blog/orders, and moving the
  products/blog content into the database.
