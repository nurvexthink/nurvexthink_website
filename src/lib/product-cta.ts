import type { Product } from "@/lib/content";

export type ProductCta = { kind: "live"; href: string } | { kind: "soon" };

/** Spec §2 CTA rules. The seed's placeholder '#' counts as no URL. */
export function productCta(p: Pick<Product, "status" | "liveUrl">): ProductCta {
  const hasUrl = Boolean(p.liveUrl) && p.liveUrl !== "#";
  if (p.status === "Soon" || !hasUrl) return { kind: "soon" };
  return { kind: "live", href: p.liveUrl };
}
