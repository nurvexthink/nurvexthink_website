import type { MetadataRoute } from "next";
import { getProducts, getPosts } from "@/lib/queries";
import { SITE_URL } from "@/lib/site-url";

// Regenerate hourly so admin-published products reach the sitemap between deploys.
export const revalidate = 3600;

const BASE = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  const staticRoutes = ["", "/products", "/blog", "/about", "/contact", "/order"].map(
    (path) => ({ url: `${BASE}${path}`, lastModified: new Date() }),
  );

  return [
    ...staticRoutes,
    ...products.map((p) => ({ url: `${BASE}/products/${p.slug}`, lastModified: new Date() })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date() })),
  ];
}
