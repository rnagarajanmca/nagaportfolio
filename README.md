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
- **Testing:** Jest + React Testing Library
- **Analytics:** Plausible (optional)
- **Email:** Resend (API integration)

## Key Features

- Structured content in `src/content` with schema validation
- Responsive sections (hero, experience timeline, projects, contact)
- Sticky nav with active-section highlighting
- Accessible CTAs and contact form with Resend-backed API route
- Light/dark themes persisted in `localStorage`
- Automated CI (lint + tests) via GitHub Actions

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

- Unit tests live in `src/components/__tests__`
- Run locally with `npm test`
- GitHub Actions workflow (`ci.yml`) runs lint + tests on pushes and PRs targeting `main`
- Lint with `npm run lint` to catch TypeScript/ESLint issues early

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

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Plausible Analytics](https://plausible.io/docs)
- [Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
