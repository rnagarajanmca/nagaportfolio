<div align="center">

  # Nagarajan Ravikumar · Portfolio

  A personal portfolio built with Next.js App Router, Tailwind CSS v4 tokens, and structured content files.

</div>

## ✨ Features

- Fully structured content sourced from `src/content` TypeScript modules.
- Responsive layout with reusable section components and timeline cards.
- Sticky navigation that updates based on scroll position.
- Theme tokens powered by Tailwind CSS v4 with a developer-facing light/dark toggle persisted in `localStorage`.
- Accessible call-to-action components with primary/secondary variants.

## 🚀 Getting Started

Install dependencies and launch the dev server:

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). Updates hot-reload as you edit files in `src/`.

### Useful Scripts

| Command        | Description                     |
| -------------- | ------------------------------- |
| `npm run dev`  | Start local development server. |
| `npm run build`| Create a production build.      |
| `npm run start`| Serve the production build.     |
| `npm run lint` | Lint source files.              |

## 🗂 Content Management Workflow

Structured data lives under `src/content`:

- `schema.ts` defines TypeScript interfaces for every section (navigation, hero, about, experience, education, skills, projects, contact).
- `site.ts` exports the content object that matches the schema.

To update the portfolio copy:

1. Edit the relevant section within `src/content/site.ts`.
2. The TypeScript compiler validates structures against `SiteContent` interfaces.
3. No component files need changes unless the layout itself is evolving.

### Adding New Sections

1. Extend interfaces in `schema.ts`.
2. Populate data in `site.ts`.
3. Update `app/page.tsx` to render the new section and wire components.

## 🎨 Theme Tokens & Toggle

- Theme tokens are defined in `src/app/globals.css` using Tailwind CSS v4 `@theme` blocks for light/dark modes.
- The `ThemeToggle` component (`src/components/ThemeToggle.tsx`) sets `document.documentElement.dataset.theme` and persists the choice in `localStorage` under `portfolio-theme`.
- A hydration-safe inline script in `app/layout.tsx` primes the theme before the first paint.

## 🧱 Key Components

- `NavBar` — sticky navigation with active section detection and theme toggle.
- `SectionWrapper` — consistent spacing and headings for anchored sections.
- `TimelineItem` — reusable layout for experience and education entries.
- `ProjectCard` — displays project descriptions, tech tags, and call-to-actions.
- `CTAButton` — configurable primary/secondary call-to-action button.

## ✅ Project Plan Tracking

Progress is tracked in `../PROJECT_PLAN.md`. Status annotations are updated as tasks complete.

## 📦 Deployment

The project targets Vercel for production deployment:

1. Set `NEXT_PUBLIC_` environment variables as needed (none required currently).
2. Run `npm run build` locally to verify the production bundle.
3. Push to a connected Git provider (GitHub/GitLab/Bitbucket) and import the repo in Vercel.

Alternative platforms (Netlify, Render) also work—ensure Node.js 18+ and install dependencies before building.

### Analytics

- Plausible analytics is wired through `src/components/PlausibleAnalytics.tsx` and injected in `app/layout.tsx`.
- To enable tracking, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in your environment (e.g., `example.com`).
- The script loads lazily and is skipped entirely when the variable is unset (development by default).

## 🧪 Testing & QA (Planned)

Upcoming work includes:

- Configure ESLint/Tailwind/prettier rules for the new token syntax.
- Add React Testing Library coverage for key components.
- Set up CI (GitHub Actions) for linting and builds.
- Run Lighthouse/axe accessibility audits and document remediation steps in the project plan.
- Add deployment checklist (preview deploy, env verification) before launch.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Preview](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)

## 📝 Changelog & Upcoming Tasks

- **2025-10-31:** Initial portfolio scaffold complete with structured content, theming, analytics, and OG image route.
  - TODO: Run Lighthouse/axe audits and record remediation steps.
  - TODO: Configure ESLint/Tailwind tooling for v4 directives.
  - TODO: Add React Testing Library coverage and GitHub Actions CI.
  - TODO: Finalize deployment checklist and create polished OG/social imagery.
