# Deploy — NurvexThink Website

The site deploys via **Vercel's native Git integration**: connect the GitHub repo once, and
every push to `main` builds and deploys automatically. Preview deploys are created for PRs.

Repo: <https://github.com/nurvexthink-admin/nurvexthink_website>

## One-time setup (Vercel dashboard)

1. Go to <https://vercel.com/new> and sign in with the GitHub account that owns/can access the repo.
2. **Import** `nurvexthink-admin/nurvexthink_website`. Vercel auto-detects Next.js — leave the
   build settings at their defaults (build: `next build`, output handled automatically).
3. Add **Environment Variables** (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://axbsghyqhhdaiylcksbv.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Supabase → Project Settings → API → anon/public key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (server-only; add when backend work needs it — never commit it)

   > The current site has no runtime Supabase calls yet, so it will build and deploy even before
   > these are set. Add them before wiring the backend.
4. Click **Deploy**. Your live URL appears when the build finishes.
5. (Optional) Add a custom domain (e.g. `nurvexthink.com`) under Project → Settings → Domains.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, tests, and a build on every PR and push to
`main`. Vercel handles deployment separately, so there is no deploy workflow in this repo.

## Notes

- If the repo is later moved to the **`nurvexthink` GitHub org** on Vercel's free (Hobby) tier,
  Vercel restricts deploying org-owned private repos and only deploys the Hobby owner's commits.
  Either keep the repo public, upgrade to a Vercel Team, or deploy via a GitHub Action + Vercel
  token (an example workflow is in this repo's git history).
- `main` should be protected once team workflows start: require a PR + 1 review (GitHub → Settings
  → Branches), and let CI gate merges.
