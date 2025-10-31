import type { SiteContent } from "./schema";

export const siteContent: SiteContent = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    name: "Nagarajan Ravikumar",
    title: "Product-Focused Full-Stack Engineer",
    summary:
      "I craft accessible, resilient web experiences with a focus on performant design systems, platform reliability, and measurable business outcomes.",
    cta: [
      { label: "Download Résumé", href: "#" },
      { label: "View Projects", href: "#projects" },
    ],
    social: [
      { platform: "GitHub", href: "https://github.com/nagarajan" },
      {
        platform: "LinkedIn",
        href: "https://www.linkedin.com/in/nagarajan-ravikumar",
      },
      { platform: "Email", href: "mailto:hello@nagarajan.dev" },
    ],
  },
  about: {
    heading: "Design-minded engineer with a knack for cohesive experiences",
    body: [
      "Over the past 6 years I have partnered with cross-functional teams to deliver high-impact products for finance, healthcare, and developer tooling startups.",
      "I thrive in ambiguous environments, shaping product direction through rapid iteration, thoughtful experimentation, and strong communication.",
    ],
  },
  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "Orion Systems",
      location: "Remote",
      startDate: "2022",
      endDate: "Present",
      description: [
        "Led the migration of a design system to React Server Components, improving load times by 35%.",
        "Partnered with product to deliver onboarding flows that increased activation by 18%.",
        "Mentored 4 engineers through growth plans and weekly pairing sessions.",
      ],
    },
    {
      title: "UI Engineer",
      company: "Northwind Labs",
      location: "Austin, TX",
      startDate: "2019",
      endDate: "2022",
      description: [
        "Delivered a data-rich analytics suite using Next.js, TypeScript, and D3.",
        "Collaborated with design to build a reusable component library in Storybook.",
      ],
    },
  ],
  education: [
    {
      school: "University of Washington",
      credential: "B.S. Human Centered Design & Engineering",
      location: "Seattle, WA",
      startDate: "2015",
      endDate: "2019",
      highlights: [
        "Capstone project shortlisted for ACM CHI Student Design Competition.",
        "Teaching assistant for Interaction Design Studio.",
      ],
    },
  ],
  skills: [
    {
      name: "Core",
      items: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL"],
    },
    {
      name: "Design & UX",
      items: ["Design Systems", "Accessibility", "Figma", "Framer"],
    },
    {
      name: "Tooling",
      items: ["Vite", "Storybook", "Vitest", "Playwright", "Turborepo"],
    },
  ],
  projects: [
    {
      name: "Aurora Design System",
      description:
        "A modular component library supporting light and dark themes with automated accessibility checks and Storybook documentation.",
      technologies: ["React", "Next.js", "Tailwind", "Storybook", "Chromatic"],
      links: [
        { label: "Case Study", href: "https://example.com/aurora" },
        { label: "GitHub", href: "https://github.com/example/aurora" },
      ],
      year: "2024",
    },
    {
      name: "Lattice Analytics",
      description:
        "Interactive dashboards for SaaS revenue teams, featuring real-time segmentation, cohort analysis, and guided onboarding flows.",
      technologies: ["Next.js", "TypeScript", "D3", "tRPC", "Vercel"],
      links: [
        { label: "Live Demo", href: "https://example.com/lattice" },
      ],
      year: "2023",
    },
    {
      name: "Atlas Developer Portal",
      description:
        "Developer-focused knowledge base with MDX-driven content, role-based access, and Algolia-powered search.",
      technologies: ["Next.js", "MDX", "Algolia", "Contentlayer"],
      links: [
        { label: "GitHub", href: "https://github.com/example/atlas" },
      ],
      year: "2022",
    },
  ],
  contact: {
    headline: "Let’s build something together",
    description:
      "I’m actively exploring new opportunities—especially those focused on design systems, developer experience, and high-impact interfaces.",
    email: "hello@nagarajan.dev",
  },
};
