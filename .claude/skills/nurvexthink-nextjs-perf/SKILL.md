---
name: nurvexthink-nextjs-perf
description: Use when writing or reviewing Next.js (App Router) code in the NurvexThink website — enforces Server-Component-first architecture, image/LCP optimization, caching, and Core Web Vitals best practices.
---

# NurvexThink — Next.js Performance & Best Practices

Apply these when building or editing any Next.js code in this repo. Sourced from the
Next.js production checklist and current (2026) performance guidance.

## Rendering & components

- **Server Components by default.** Only add `"use client"` when you need interactivity,
  browser APIs, hooks like `useState`/`useEffect`, or event handlers.
- **`"use client"` is contagious** — keep it at the *leaves* of the tree. A client boundary
  high up ships unnecessary JS for everything below it. Push interactivity down into small
  client components; keep data-fetching and layout in server components.
- Fetch data in Server Components; pass plain props to client leaves.
- Use **Server Actions** for form mutations (e.g., the lead form, admin CRUD) instead of
  hand-rolled API routes where it fits.

## Images & LCP

- Always use **`next/image`**, never raw `<img>`.
- Add **`priority`** to the above-the-fold hero image (biggest single LCP win — often 1–2s).
- Provide width/height (or `fill` + sized container) to avoid layout shift (CLS).
- Serve modern formats (Next does WebP/AVIF automatically).

## Caching & data

- Prefer static/ISR where possible; use `fetch` caching with sensible `revalidate`.
- Don't disable caching unless truly required.
- Use `Suspense` + streaming for slow sections so the shell paints fast.
- Use parallel data fetching (`Promise.all`) for independent requests.

## JS & bundle

- On Next 15+, lean on the **React Compiler** for auto-memoization; reserve manual
  `useMemo`/`useCallback` for what it can't infer.
- `next/dynamic` (lazy-load) heavy client-only widgets — especially the 3D scene.
- Keep third-party scripts out of the critical path (`next/script` with `strategy`).

## Core Web Vitals targets

- **LCP** < 2.5s · **INP** < 200ms · **CLS** < 0.1.
- Verify with Lighthouse / `@vercel/speed-insights` before shipping.

## Project conventions

- TypeScript everywhere; no `any` without justification.
- Tailwind + shadcn/ui for styling; use the brand theme tokens from CLAUDE.md.
- Keep files focused and small — one clear purpose per component.

## References
- https://nextjs.org/docs/app/guides/production-checklist
- https://www.debugbear.com/blog/nextjs-performance
