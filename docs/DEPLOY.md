# Deploy — NurvexThink Website

Deploys run via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`,
using the Vercel CLI + a token. This avoids Vercel Hobby's org-private-repo and
commit-author restrictions, so all admins' merged work deploys for free.

## One-time setup

1. Create the Vercel project (link it to this repo, or create an empty one and run `vercel link`).
2. Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (from `.vercel/project.json` after `vercel link`,
   or the Vercel dashboard → Project Settings).
3. Create a Vercel access token (Account Settings → Tokens).
4. In the GitHub repo → Settings → Secrets and variables → Actions, add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
5. In Vercel project env vars, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://axbsghyqhhdaiylcksbv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (from Supabase → Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` = (server-only; never commit)

## Branch protection

Protect `main`: require a PR + 1 review, and require the **CI** workflow to pass before merge.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, tests, and a build on every PR and push to `main`.
