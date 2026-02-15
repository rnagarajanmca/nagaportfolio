<div align="center">

  # Nagarajan Ravikumar · Portfolio

  Modern personal portfolio built with the Next.js App Router, Tailwind CSS v4 design tokens, and structured TypeScript content.

  [![CI](https://github.com/rnagarajanmca/nagaportfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rnagarajanmca/nagaportfolio/actions/workflows/ci.yml)
  ![Node.js](https://img.shields.io/badge/node-20.x-339933?logo=node.js&logoColor=white)
  ![Next.js](https://img.shields.io/badge/next.js-16.0.1-black?logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
  [![Hosted on Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
  ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

</div>

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Key Features](#key-features)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Architecture](#architecture)
7. [Styling & Theming](#styling--theming)
8. [Testing & Quality](#testing--quality)
9. [Deployment](#deployment)
10. [Project Structure](#project-structure)
11. [Resources](#resources)

## Overview

This repo powers Nagarajan Ravikumar’s portfolio. Content is strictly typed, UI components are reusable, and runtime quality gates (linting, testing, CI) keep the site production-ready.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 preview tokens + custom CSS variables
- **Testing:** Jest + React Testing Library (unit/integration) + Playwright (E2E)
- **Rate Limiting:** Upstash Redis (serverless-compatible)
- **Analytics:** Plausible (optional)
- **Email:** Resend (API integration)

## Key Features

- **Structured Content:** Strict TypeScript schema validation in `src/content/site.ts`
- **Responsive Design:** Mobile-first layout with Tailwind CSS v4 design tokens
- **Navigation:** Sticky nav with active-section highlighting and smooth scroll behavior
- **Accessibility:** WCAG-compliant with ARIA labels, semantic HTML, and proper color contrast
- **Theme Support:** Light/dark modes with system preference detection and localStorage persistence
- **Contact Form:** Accessible form with Resend email integration and Upstash Redis rate limiting (3 req/15min)
- **Resume Download:** PDF generation with Chromium backend and download tracking
- **Testing:** 74 unit tests (Jest + React Testing Library) + 20 E2E tests (Playwright)
- **CI/CD:** Automated GitHub Actions workflow (lint, type-check, tests on every push)
- **Performance:** Optimized bundle with Turbopack and production-ready deployment on Vercel

## Getting Started

```bash
npm install
npm run dev
```

- Local dev server: http://localhost:3000
- Update content in `src/content/site.ts` and components in `src/components`

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the codebase |
| `npm run type-check` | Execute TypeScript in `--noEmit` mode |
| `npm test` | Execute unit/integration tests |
| `npm test -- --watch` | Watch mode for tests |
| `npm run e2e` | Run end-to-end tests (requires dev server running) |
| `npm run e2e:ui` | Run E2E tests with interactive UI |
| `npm run e2e:debug` | Run E2E tests in debug mode |

## Architecture

- `src/content/schema.ts` – Type definitions for every portfolio section
- `src/content/site.ts` – Single source of truth for portfolio data
- `src/app/page.tsx` – Layout composition using the structured content
- `src/components` – Reusable UI blocks (NavBar, SectionWrapper, ProjectCard, etc.)
- `src/app/api` – API routes (`/contact`, `/resume`) for form handling and downloads

## Styling & Theming

- Theme tokens defined in `src/app/globals.css` using Tailwind v4 `@theme` blocks
- `ThemeProvider` applies tokens, toggles the `dark` class, and persists state
- `ThemeToggle` button exposes the theme switcher inside the nav bar

## Testing & Quality

### Unit & Integration Tests
- Located in `src/components/__tests__/`
- 74 test cases across 11 test suites (~73% component coverage)
- Run with `npm test` or watch with `npm test -- --watch`

### End-to-End Tests
- Located in `e2e/*.spec.ts`
- 20 passing E2E tests covering critical user flows:
  - Homepage navigation and section visibility
  - Contact form submission
  - Resume download functionality
  - Theme toggle and persistence
- Run with `npm run e2e` (requires local dev server)

### Quality Gates
- GitHub Actions workflow (`ci.yml`) runs lint + tests on all pushes and PRs
- Pre-commit linting catches issues early
- TypeScript strict mode ensures type safety
- See `docs/` directory for detailed testing documentation

## Deployment

Optimized for Vercel:

1. Ensure environment variables are configured in the Vercel dashboard (e.g., `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if used).
2. Run `npm run build` locally to validate the production bundle.
3. Push to GitHub; Vercel will build and deploy automatically using the `portfolio` directory.

Other platforms (Netlify, Render) remain compatible—install dependencies and run the build script.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── __tests__/
│   └── content/
├── public/
├── README.md
└── package.json
```

## Documentation

For comprehensive guides and detailed documentation, see the [**`docs/`** directory](./docs/README.md):

- **[Architecture Review](./docs/ARCHITECTURE_REVIEW.md)** — Complete project analysis and optimization roadmap
- **[Deployment Workflow](./docs/DEPLOYMENT_WORKFLOW.md)** — Step-by-step deployment guide
- **[Testing Guide](./docs/README.md#testing)** — Unit, integration, and E2E testing documentation
- **[Design System](./docs/craftivo-visual-blueprint.md)** — Visual guidelines and design tokens

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Testing](https://playwright.dev)
- [Jest Testing Framework](https://jestjs.io)
- [Plausible Analytics](https://plausible.io/docs)
- [Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
