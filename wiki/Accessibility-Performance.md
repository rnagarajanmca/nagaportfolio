# Accessibility & Performance Audit Plan

## Tools & Commands
- **Lighthouse (Chrome DevTools):** Run against the deployed preview and local build (`npm run build && npm run start`). Capture scores for Performance, Accessibility, Best Practices, and SEO.
- **axe DevTools (or @axe-core/playwright):** Scan core pages for WCAG 2.1 AA violations.
- **Chrome Coverage / Web Vitals:** Verify Core Web Vitals via `next dev --turbo` or deployed preview.

## Checklist
1. [ ] Generate Lighthouse report (desktop & mobile) and archive the JSON/HTML artifacts under `reports/lighthouse/`.
2. [ ] Record major findings (performance opportunities, accessibility issues) in `docs/audit-findings.md`.
3. [ ] Re-run audits after fixes to confirm improvements.
4. [ ] Track remaining action items in `PROJECT_PLAN.md` section 5 & 6.

## Focus Areas
- **Performance:** Image optimization, bundle size analysis, preloading critical resources, checking Tailwind tree-shaking.
- **Accessibility:** Color contrast with new palette, skip link behavior, keyboard focus states, aria attributes on nav and timeline components.
- **SEO & Metadata:** Validate new Open Graph route, ensure final canonical URL, verify Structured Data if added later.
