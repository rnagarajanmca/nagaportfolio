# Craftivo-Inspired Redesign · Visual Blueprint

**Last Updated:** 2025-11-01

---

## 1. Concept Overview

- **Objective:** Reimagine the portfolio UI with Craftivo-inspired structure while retaining a bespoke creative identity.
- **Mood:** Sleek creative studio aesthetic combining airy gradients, glassmorphism panels, and warm coral + indigo accents.
- **Primary Palette:**
  - Coral — `#FF7C5C` (primary accent)
  - Indigo — `#5868F5` (secondary accent)
  - Midnight — `#111A3A` (core text)
  - Dove — `#F3F5FB` (background)
  - Champagne — `#FFD267` (highlight)
- **Typography:**
  - Headlines: Modern geometric sans (Geist/Poppins) with tight leading.
  - Body copy: Clean grotesk (Geist/Inter) for readability.
  - Micro-labels: Uppercase with wide tracking for section captions.
- **Motifs:** Gradient blobs, thin geometric dividers, rounded glass cards, circular avatar treatments, subtle noise overlays.

---

## 2. Section Wireframes & Key Interactions

### 2.1 Header & Navigation
- Sticky, blurred glass bar spanning full width.
- Left: Monogram or wordmark badge.
- Right: Navigation pills (Home, About, Services, Work, Testimonials, Contact) with hover glow, plus theme toggle.
- Active state: thin coral underline beneath link text.

### 2.2 Hero (Full-viewport)
- Background uses `--gradient-hero` with floating abstract shapes.
- **Left column (~60% width):**
  - Upper micro-label “Creative Technologist”.
  - H1 headline with coral emphasis on keywords.
  - Supporting body copy.
  - CTA row: Primary pill “Start a project” + secondary outline “View résumé”.
  - Social icons in circular buttons; optional stat chips (Projects, Years, Awards).
- **Right column (~40% width):**
  - Portrait cutout layered over translucent card with signature.
  - Floating highlight chips containing specialties (Android, Strategy, Design Systems).
- Parallax background movement on scroll.

### 2.3 About & Creative Statement
- Split background: diagonal wipe between solid white and soft gradient.
- Left: Section heading + accent subtitle line.
- Right: Two paragraphs, bullet micro-highlights, and download CV button.
- Stat trio (Projects/Years/Awards) in glass cards beneath copy.
- Followed by marquee “Transforming ideas into digital reality” with rotating keywords on a gradient band.

### 2.4 Experience & Education Timeline
- Centered title with subtitle line.
- Vertical timeline spine with glowing nodes.
- Experience cards alternate left/right, each with glass surface, job title, company, tag chips, descriptive bullets.
- Education list below with similar styling and certificates as pill tags.

### 2.5 Services Grid
- Background uses `--gradient-section` plus soft pattern overlay.
- Grid layout (2 × 3 or 2 × 4) of glass cards:
  - Icon badge in coral.
  - Service title, concise description, and “Explore →” link.
- Full-width CTA strip “Transform Your Vision Into Reality” with button call-to-action.

### 2.6 Portfolio Showcase
- Filter chips (All, Creative, Digital, Strategy, Development) styled as pills.
- Two-column gallery with project thumbnails:
  - Hover overlay gradient, project name, category, arrow icon.
  - Optionally display quick stat (e.g., “Product Design · 2024”).
- Collaboration prompt: “Like what you see?” card with CTA to contact form.

### 2.7 Testimonials / Collaboration Strip (Optional)
- Dark indigo background with subtle noise texture.
- Carousel of testimonials on glass cards with large quote icon and rating chips.

### 2.8 Contact Section
- Split layout:
  - Left: Contact cards (Address, Email, Call) with icon badges and glass treatment.
  - Right: Contact form inside rounded, elevated panel; floating labels, coral focus ring, success/error feedback.
- Secondary call-to-action (Cal.com) button along bottom.

### 2.9 Footer
- Light/dark adaptive background.
- Left: Brand statement and micro-tagline “Portfolio · 2025 · Built with Next.js”.
- Right: Quick links and social icon row.

---

## 3. Styling & Interaction System

| Element | Treatment |
| --- | --- |
| Buttons | Rounded pills, `--shadow-elevated`, hover lift + 3° rotation, trailing icon shift |
| Cards | Glassmorphism: `--gradient-surface`, translucent borders, `backdrop-filter: blur(24px)`, soft corner radius |
| Dividers | 1px lines using `color-mix` with accents; dotted or dashed options for timeline |
| Motion | Scroll fade-up staggered (0ms/150ms/300ms); parallax on hero background; hover overlay sweeps |
| Noise overlay | 4–6% opacity grain texture atop gradients to avoid banding |
| Dark mode | Token mapping via ThemeProvider (`--color-accent-secondary`, `--color-surface-strong`, etc.) |

Accessibility reminders:
- Maintain WCAG 2.1 AA contrast.
- Provide focus rings via `--color-ring` on interactive elements.
- Preserve heading hierarchy (H1 only in hero, H2 per section). 

---

## 4. Tooling Suggestions

- **Design platforms:** Figma or Sketch for high-fidelity mocks; leverage gradient/noise plugins and component libraries.
- **AI prompt (Midjourney / DALL·E / SDXL):**
  > modern portfolio homepage design inspired by Craftivo template, hero section with coral and indigo gradients, glassmorphism cards, rounded buttons, creative studio vibe, portrait cutout, stat badges, services grid, timeline section, high-end web UI, UX design, clean minimal layout, 16:9, dribbble style
- **Workflow tip:** Start with hero and services components, then extend palette and sections; ensure theme tokens from `ThemeProvider` are mirrored in design file.

---

## 5. Next Steps

1. Translate this blueprint into Figma frames or AI-generated references for stakeholder review.
2. Align design components with existing React/Next.js component structure.
3. Iterate on feedback before commencing implementation of Project Plan v2 milestones.
