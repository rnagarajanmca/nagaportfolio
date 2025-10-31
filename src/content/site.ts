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
    title: "Senior Android Engineer",
    summary:
      "Crafting seamless mobile experiences for over a decade with deep Android expertise, diverse screen support, Java mastery, and Agile delivery.",
    cta: [
      { label: "Email Nagarajan", href: "mailto:hello@nagarajan.dev" },
      { label: "View Experience", href: "#experience" },
    ],
    social: [
      { platform: "Portfolio", href: "https://nagarajanr.com" },
      { platform: "LinkedIn", href: "https://www.linkedin.com/in/nagarajan-ravikumar" },
      { platform: "Email", href: "mailto:hello@nagarajan.dev" },
    ],
  },
  about: {
    heading: "Senior Android engineer crafting reliable mobile products",
    body: [
      "Over a decade of delivering high-impact Android apps across logistics, retail, and asset management domains.",
      "Blend of hands-on engineering and leadership—comfortable guiding cross-functional teams, mentoring engineers, and operating in Agile environments.",
    ],
  },
  experience: [
    {
      title: "Senior Android Engineer",
      company: "Wayfair",
      location: "Boston, MA",
      startDate: "2019",
      endDate: "Present",
      description: [
        "Key contributor migrating warehouse operations from legacy RF devices to Android-based Zebra hardware.",
        "Shaped a resilient Android framework adopted by 15+ teams, enabling 55+ workflows for efficient supply-chain processes.",
      ],
      badges: ["Android", "Supply Chain", "Kotlin"],
    },
    {
      title: "Android Developer",
      company: "7-Eleven",
      location: "Dallas, TX",
      startDate: "2017",
      endDate: "2019",
      description: [
        "Integrated checkout station pilots to evaluate and refine self-checkout flows across stores.",
        "Implemented iBeacon integrations to identify nearby shops, powering personalized checkout experiences.",
      ],
      badges: ["Android", "iBeacon", "Retail"],
    },
    {
      title: "Tech Lead",
      company: "TrackX",
      location: "Denver, CO",
      startDate: "2014",
      endDate: "2017",
      description: [
        "Led TrackX Mobile asset tracking initiatives using camera, Bluetooth scanning, RFID, and GPS.",
        "Enabled remote management via the TrackX GAME® platform to streamline enterprise operations.",
      ],
      badges: ["Asset Tracking", "Android", "IoT"],
    },
    {
      title: "Technical Architect",
      company: "Container Centralen",
      location: "Apopka, FL",
      startDate: "2012",
      endDate: "2014",
      description: [
        "Built CC Mobility app to modernize asset tracking for retail garden center staff and merchandising teams.",
        "Transitioned the product from PhoneGap to native Android to improve map rendering and overall performance.",
      ],
      badges: ["Android", "Architecture", "Performance"],
    },
  ],
  education: [
    {
      credential: "Bachelor of Computer Science",
      school: "University of Madras",
      location: "Chennai, India",
      startDate: "2000",
      endDate: "2003",
      highlights: [],
    },
    {
      credential: "Bachelor of Computer Applications",
      school: "Thiruthangal Nadar College",
      location: "Chennai, India",
      startDate: "1997",
      endDate: "2000",
      highlights: [],
    },
  ],
  skills: [
    {
      name: "Mobile Engineering",
      items: ["Android", "Kotlin", "Java", "Jetpack", "Compose"],
    },
    {
      name: "Domain Expertise",
      items: ["Supply Chain", "Retail", "Asset Tracking", "IoT Integrations"],
    },
    {
      name: "Collaboration",
      items: ["Agile & Scrum", "Cross-Functional Leadership", "Mentorship", "Framework Design"],
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
