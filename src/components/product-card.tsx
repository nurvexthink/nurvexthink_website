import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/content";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Product["status"], string> = {
  Live: "bg-emerald-500/12 text-emerald-500 ring-emerald-500/20",
  Beta: "bg-amber-500/12 text-amber-500 ring-amber-500/20",
  Soon: "bg-muted text-muted-foreground ring-border",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group border-border bg-card hover:border-primary/40 relative flex flex-col gap-4 rounded-2xl border p-6 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
          {product.category}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
            STATUS_STYLES[product.status],
          )}
        >
          {product.status}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading flex items-center gap-1.5 text-xl font-semibold tracking-tight">
          {product.name}
          <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-muted-foreground text-sm">{product.summary}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {product.tags.map((tag) => (
          <span key={tag} className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
