import { createPublicSupabaseClient } from "@/lib/supabase/public";
import type { Product, ProductDetail, BlogPost } from "@/lib/content";
import type { ProductRow, BlogPostRow } from "@/lib/supabase/types";

const LIFECYCLE_LABEL = { live: "Live", beta: "Beta", soon: "Soon" } as const;

/** Grid/detail selects. Nested selects are RLS-filtered per table for anon. */
const PRODUCT_SELECT = "*, product_categories(name), product_blog_links(sort_order, blog_posts(slug,title))";
const PRODUCT_DETAIL_SELECT =
  "*, product_categories(name), product_features(id,title,description,image,sort_order), product_blog_links(sort_order, blog_posts(slug,title,excerpt,cover_image))";

type FeatureJoin = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  sort_order: number;
};

/**
 * One shape covers both selects: the grid select only fetches slug/title,
 * the detail select also fetches excerpt/cover_image — so those two are
 * optional here and defaulted at the mapping site.
 */
type LinkJoin = {
  sort_order: number;
  blog_posts: {
    slug: string;
    title: string;
    excerpt?: string | null;
    cover_image?: string | null;
  } | null;
};

type ProductRowJoined = ProductRow & {
  product_categories?: { name: string } | null;
  product_features?: FeatureJoin[];
  product_blog_links?: LinkJoin[];
};

function paragraphs(text: string | null): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function toProduct(row: ProductRowJoined): Product {
  const related = [...(row.product_blog_links ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .flatMap((l) => (l.blog_posts ? [{ slug: l.blog_posts.slug, title: l.blog_posts.title }] : []))
    .slice(0, 2);
  return {
    slug: row.slug,
    name: row.name,
    category: row.product_categories?.name ?? "Software",
    tagline: row.tagline?.trim() || (row.summary ?? ""),
    summary: row.summary ?? "",
    description: row.description ?? "",
    status: LIFECYCLE_LABEL[row.lifecycle] ?? "Live",
    tags: row.tech ?? [],
    year: row.year ?? "",
    liveUrl: row.live_url ?? "#",
    repoUrl: row.repo_url,
    coverImage: row.cover_image,
    highlights: row.highlights ?? [],
    featured: row.featured,
    related,
  };
}

export function toProductDetail(row: ProductRowJoined): ProductDetail {
  const base = toProduct(row);
  const features = [...(row.product_features ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((f) => ({ title: f.title, description: f.description ?? "", image: f.image }));
  const relatedPosts = [...(row.product_blog_links ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .flatMap((l) =>
      l.blog_posts
        ? [{
            slug: l.blog_posts.slug,
            title: l.blog_posts.title,
            excerpt: l.blog_posts.excerpt ?? "",
            coverImage: l.blog_posts.cover_image ?? null,
          }]
        : [],
    );
  return {
    ...base,
    descriptionParagraphs: paragraphs(row.description),
    technicalParagraphs: paragraphs(row.technical_details),
    gallery: row.gallery ?? [],
    features,
    relatedPosts,
    seoDescription:
      row.seo_description?.trim() ||
      [base.tagline, base.summary].filter(Boolean).join(" — "),
    ogImage: row.og_image ?? row.cover_image,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(toProduct);
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return toProduct(data);
  } catch {
    return null;
  }
}

export async function getProductDetailBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_DETAIL_SELECT)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return toProductDetail(data);
  } catch {
    return null;
  }
}

function toPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "Writing",
    date: row.published_at ?? row.created_at,
    readingTime: row.reading_time ?? "",
    author: row.author_name ?? "NurvexThink",
    content: (row.content ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data) return [];
    return data.map(toPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createPublicSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error || !data) return null;
    return toPost(data);
  } catch {
    return null;
  }
}
