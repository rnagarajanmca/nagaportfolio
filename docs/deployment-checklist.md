# Deployment Checklist

## Prerequisites
- [ ] Install dependencies: `npm install`
- [ ] Ensure environment variables:
  - `RESEND_API_KEY` (required for contact form - get from https://resend.com)
  - `CONTACT_EMAIL` (optional, defaults to naga@nagarajanr.com)
  - `RESEND_FROM_EMAIL` (optional, defaults to portfolio@nagarajanr.com)
  - `NEXT_PUBLIC_BASE_URL` (optional, defaults to https://nagarajanr.com)
  - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional for analytics)

## Verification
- [ ] Run lint: `npm run lint`
- [ ] Run tests: `npm test`
- [ ] Build production bundle: `npm run build`
- [ ] Start production server locally: `npm run start`

## CI/CD
- [ ] GitHub Actions (`.github/workflows/ci.yml`) passing on latest commit.
- [ ] Configure Vercel (or preferred hosting) project pointing to `portfolio` directory.

## Post-Deployment
- [ ] Validate Lighthouse and axe reports (see `docs/accessibility-performance.md`).
- [ ] Verify OG/Twitter preview using final asset (see `docs/social-preview.md`).
- [ ] Update `PROJECT_PLAN.md` and README with final deployment status and links.
