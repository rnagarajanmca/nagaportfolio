# Accessibility & Performance Findings

_Last updated: 2025-11-01_

## Lighthouse (Desktop)
- Performance: **99**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

### Notes
- Metrics are already in the "excellent" band; no immediate performance blockers detected.
- Continue to monitor when new assets/content are added.

## Lighthouse (Mobile)
- Performance: **80**
- Accessibility: **100**
- Best Practices: **96**
- SEO: **100**

### Notes
- Performance dipped vs. desktop primarily due to simulated mobile throttling; review opportunities flagged in the report (likely extension interference per warning).
- Confirm audits in Chrome incognito profile to eliminate extension noise if needed.

## axe Accessibility Scan
- _Pending_: run axe DevTools (or automated equivalent) and capture any WCAG findings here.

## Follow-up Tasks
1. [ ] Run Lighthouse (mobile) and update scores above.
2. [ ] Run axe scan, list any issues, and link remediation tickets.
3. [ ] Re-test after addressing any findings.
