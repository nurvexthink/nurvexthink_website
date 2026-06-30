import Link from "next/link";
import type { BlogPost } from "@/lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-border bg-card hover:border-primary/40 flex flex-col gap-3 rounded-2xl border p-6 transition-colors"
    >
      <div className="text-muted-foreground flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase">
        <span className="text-primary">{post.category}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="font-heading group-hover:text-primary text-lg font-semibold tracking-tight text-balance transition-colors">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
      <div className="text-muted-foreground mt-auto flex items-center gap-2 pt-3 text-xs">
        <span>{post.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
    </Link>
  );
}
