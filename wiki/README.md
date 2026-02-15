# Documentation

This directory contains comprehensive documentation for the Nagarajan Ravikumar portfolio project. Use the navigation below to find what you need.

## Quick Navigation

### Getting Started & Overview
- **[Architecture Review](Architecture-Review)** — Comprehensive analysis of project structure, tech stack, optimization recommendations, and priority items for improvement
  - Grade: A+ overall project assessment
  - Coverage: All aspects from tech stack to accessibility
  - Priority roadmap for future enhancements

### Deployment & DevOps
- **[Deployment Workflow](Deployment-Guide)** — Complete guide for deploying to Vercel and other platforms
  - Environment configuration
  - Build and deployment steps
  - Post-deployment validation
  - Troubleshooting common issues

### Design & Visual References
- **[Craftivo Visual Blueprint](Design-System)** — Design system specifications and visual guidelines
- **[Social Preview](Social-Preview)** — Open Graph and meta tag configuration
- **[Accessibility & Performance](Accessibility-Performance)** — Accessibility standards and performance considerations

### Quality Assurance
- **[Audit Findings](Audit-Findings)** — Summary of content audits and quality assessments
- **[Deployment Checklist](Deployment-Checklist)** — Pre-deployment verification steps

---

## Testing

The project includes comprehensive testing coverage:

### Unit & Integration Tests
- Located in: `src/components/__tests__/`
- Framework: Jest + React Testing Library
- Coverage: 74 tests across 11 test suites (~73% component coverage)
- Run with: `npm test`

### End-to-End Tests
- Located in: `e2e/*.spec.ts`
- Framework: Playwright
- Scenarios: Homepage navigation, contact form, resume download, theme toggle
- Coverage: 20 passing E2E tests (80% coverage)
- Run with: `npm run e2e` (requires local dev server)

### Running Tests
```bash
# Unit/Integration tests
npm test                   # Run all unit tests
npm test -- --watch       # Watch mode
npm test -- --coverage    # Coverage report

# E2E tests (requires local dev server)
npm run dev              # In one terminal
npm run e2e              # In another terminal
npm run e2e:ui           # Interactive UI mode
npm run e2e:debug        # Debug mode
```

---

## Content Structure

### Portfolio Content
- **File:** `src/content/site.ts`
- **Type-safe:** Uses schema validation from `src/content/schema.ts`
- **Sections:** Hero, About, Experience, Education, Skills, Projects, Contact
- **Maintenance:** Update this file to modify portfolio content

### Styling & Theming
- **Theme System:** Tailwind CSS v4 with design tokens in `src/app/globals.css`
- **Dark Mode:** Persisted in localStorage via `ThemeProvider`
- **Custom Variables:** All colors/spacing defined as CSS variables

---

## API Routes

### Contact Form
- **Endpoint:** `POST /api/contact`
- **Rate Limiting:** Upstash Redis (3 requests per 15 minutes per IP)
- **Response:** Email delivery via Resend
- **Status Codes:** 200 (success), 400 (validation), 429 (rate limited), 500 (server error)

### Resume Download
- **Endpoint:** `GET /api/resume`
- **Format:** PDF (generated with Chromium via Playwright)
- **File:** Generated from HTML template
- **Headers:** Content-Type, Content-Disposition for download

---

## Environment Variables

### Required
- `RESEND_API_KEY` — API key for email delivery (contact form)
- `CONTACT_EMAIL` — Email address to receive contact form submissions

### Optional
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — Domain for analytics (Plausible)
- `UPSTASH_REDIS_REST_URL` — Redis instance for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` — Redis authentication token
- `RATE_LIMIT_WINDOW_MS` — Rate limit time window (default: 900000ms / 15min)
- `RATE_LIMIT_MAX_REQUESTS` — Max requests per window (default: 3)

See `.env.example` for all environment variables with descriptions.

---

## Useful Resources

- **[Next.js Documentation](https://nextjs.org/docs)** — Framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Utility-first CSS framework
- **[Playwright Testing](https://playwright.dev)** — Browser automation and testing
- **[Jest Documentation](https://jestjs.io)** — Testing framework
- **[React Testing Library](https://testing-library.com/react)** — Testing utilities
- **[Resend](https://resend.com/docs)** — Email delivery service
- **[Upstash](https://upstash.com/docs/redis)** — Serverless Redis
- **[Vercel Deployment](https://nextjs.org/docs/app/building-your-application/deploying)** — Deploy guide

---

## Key Commands Reference

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Building & Production
npm run build            # Build for production
npm run start            # Start production server

# Quality & Testing
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm test                 # Unit tests
npm run e2e              # E2E tests

# Deployment
npm run deploy           # Deploy to Vercel (if configured)
```

---

## Support

- **Issues:** See the main [README.md](../README.md) for quick start guide
- **Questions:** Review the specific documentation files above
- **Feedback:** Report issues at [GitHub Issues](https://github.com/rnagarajanmca/nagaportfolio/issues)

---

**Last Updated:** February 2025
**Documentation Version:** 2.0
