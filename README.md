# NurvexThink — Main Website

The public hub for NurvexThink: product showcase, blog, custom-order intake, and (later) an
admin dashboard. Built with Next.js 16 + Supabase, deployed on Vercel.

## Stack

TypeScript · Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui · React Three Fiber (3D,
later milestone) · Supabase (Postgres/Auth/Storage) · Vercel.

## Develop

```bash
cp .env.example .env.local   # fill in NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — Vitest
- `npm run format` — Prettier write

## Docs

- Design spec: `docs/superpowers/specs/2026-06-30-nurvexthink-website-design.md` (+ PDF)
- Foundation plan: `docs/superpowers/plans/2026-06-30-nurvexthink-website-foundation.md` (+ PDF)
- Deploy: `docs/DEPLOY.md`
- Project conventions: `CLAUDE.md`
