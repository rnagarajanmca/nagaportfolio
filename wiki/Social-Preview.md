# Social Preview & Design Polish

## Current State
- Dynamic Open Graph image generated via `src/app/opengraph-image.tsx` with gradient background and legacy copy.
- Metadata in `app/layout.tsx` references `/opengraph-image` for Twitter/Open Graph cards.

## Next Steps
1. [ ] Export a bespoke OG image (1200x630) from design tooling using current visual language.
2. [x] Replace dynamic route with static asset if preferred, or update typography/branding in the existing generator. _(Updated generator with refreshed gradient, typography, and role-focused messaging.)_
3. [ ] Verify preview cards via [Open Graph](https://www.opengraph.xyz/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator).
4. [ ] Update README and project plan once the final asset is in place.
