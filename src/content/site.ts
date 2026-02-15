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
    title: "Technical Manager · Mobile Platforms",
    summary:
      "Guiding mobile product initiatives end-to-end: aligning strategy, architecture, and execution to deliver reliable, multi-platform experiences.",
    typingPhrases: [
      "Driving mobile strategy",
      "Architecting scalable platforms",
      "Championing engineering excellence",
      "Leading cross-functional teams",
      "Optimizing mobile performance",
      "Shaping seamless experiences",
      "Enabling innovation at scale",
      "Delivering high-impact products",
    ],
    metrics: [
      {
        label: "Years of leadership",
        value: "12+",
        description: "Driving mobile & digital outcomes",
      },
      {
        label: "Teams enabled",
        value: "15",
        description: "Cross-functional squads aligned",
      },
      {
        label: "Apps delivered",
        value: "40+",
        description: "High-performing launches shipped",
      },
    ],
    cta: [
      {
        label: "Download Resume",
        href: "/api/resume",
        download: true,
      },
      { label: "View Experience", href: "#experience", variant: "secondary" },
    ],
    social: [
      { platform: "LinkedIn", href: "https://www.linkedin.com/in/nagarajanr0" },
      { platform: "GitHub", href: "https://github.com/rnagarajanmca" },
      { platform: "Email", href: "mailto:naga@nagarajanr.com" },
    ],
  },
  about: {
    heading: "Technical Manager aligning strategy and execution",
    body: [
      "Technical manager with 12+ years building and leading mobile platforms end-to-end—growing from Android engineer to directing teams of 15+ while maintaining uncompromising engineering rigor.",
      "I blend deep technical expertise with strategic focus to align mobile initiatives with business goals, keeping quality, security, and innovation at the forefront.",
    ],
  },
  experience: [
    {
      title: "Software Engineering Manager",
      company: "7-Eleven",
      location: "Dallas, TX",
      startDate: "Mar 2024",
      endDate: "Present",
      description: [
        "Lead three specialized core teams totaling 15+ engineers who build and release the 7-Eleven, Speedway, and 7Now mobile applications, while partnering with 8+ product pods to deliver features and services across the platform.",
        "Orchestrated the consolidation of 7-Eleven and Speedway codebases into a unified platform, reducing development costs by 50% and without impacting delivery timelines.",
        "Driving release management for 7-Eleven and Speedway mobile apps, ensuring stability improvements and compliance with the latest SDK standards across both platforms.",
        "Led technical modernization efforts including the migration to Compose for Android and SwiftUI for iOS, while directing comprehensive library audits and upgrades to support the latest OS versions.",
        "Led code quality initiatives by driving SonarQube integration and establishing quality standards for shared frameworks and reusable UI components used across all three applications.",
        "Partnered with Security teams to enhance the organization's security posture by implementing security best practices and measures throughout the mobile application ecosystem.",
        "Launched automation initiatives for mobile frameworks to streamline development processes and reduce manual testing efforts.",
        "Worked cross-functionally to identify industry best practices and reusable solutions, leading their integration into various 7-Eleven mobile apps.",
      ],
      badges: ["Engineering Leadership", "Mobile Strategy", "Platform Architecture"],
    },
    {
      title: "Senior Software Engineer",
      company: "Wayfair",
      location: "Boston, MA",
      startDate: "Mar 2021",
      endDate: "Mar 2024",
      description: [
        "Led the warehousing Android platform, enabling feature teams to scale workflows and ship faster across fulfillment operations.",
        "Introduced app-wide state serialization so associates resume work from cached context, boosting throughput and reliability.",
        "Modernized core workflows from MVP to MVI architecture, reducing defects and easing future feature work.",
        "Onboarded and mentored new Android engineers, accelerating team productivity and platform adoption.",
        "Leveraged Kotlin, Coroutines, Dagger/Hilt, SQLDelight, and Jetpack Compose to deliver resilient, maintainable mobile solutions.",
        "Partnered on the Nexus warehouse management system rollout supporting 18 fulfillment centers, 8,000+ users, and 124M scans in H1 2022.",
      ],
      badges: ["Android", "Kotlin", "Platform Enablement"],
    },
    {
      title: "Software Engineer",
      company: "Wayfair",
      location: "Boston, MA",
      startDate: "Jun 2019",
      endDate: "Mar 2021",
      description: [
        "Co-created Wayfair's Nexus warehouse management platform, replacing legacy RF hardware with touchscreen Android devices.",
        "Implemented reusable modules that powered 45+ warehouse workflows and millions of weekly scans.",
        "Partnered with operations to pilot and iterate on mobile workflows across 18 fulfillment centers.",
        "Established the platform as a separately deployable component, improving release cadence and scalability.",
      ],
      badges: ["Warehouse Tech", "Android", "Scale"],
    },
    {
      title: "Senior Android Engineer",
      company: "7-Eleven",
      location: "Dallas, TX",
      startDate: "Sep 2018",
      endDate: "Jun 2019",
      description: [
        "Extended the consumer mobile platform that powers checkout, fuel rewards, and delivery journeys for 7-Eleven and Speedway brands.",
        "Partnered with seven product pods to deliver reusable modules and accelerate release cadence across the portfolio.",
      ],
      badges: ["Android", "Retail", "Platform Strategy"],
    },
    {
      title: "Senior Android Engineer",
      company: "Delta Air Lines",
      location: "Atlanta, GA",
      startDate: "Jul 2018",
      endDate: "Sep 2018",
      description: [
        "Shipped rapid Android enhancements for the Fly Delta experience to support day-of-travel servicing and loyalty features.",
        "Collaborated with design and QA in an agile release train to deliver high-quality updates under accelerated timelines.",
      ],
      badges: ["Android", "Aviation", "Contract Delivery"],
    },
    {
      title: "Technical Lead",
      company: "Fusion Global Technologies and Solutions",
      location: "Chennai, India",
      startDate: "Dec 2014",
      endDate: "Jun 2018",
      description: [
        "Led an eight-person mobile practice delivering asset-tracking and logistics platforms across global retail and supply-chain clients.",
        "Directed TrackX TrueMobile, IVT forklift tracking, and Container Centralen mobility programs from concept to deployment, cutting fleet idle time and inventory shrinkage.",
        "Standardized engineering playbooks, CI pipelines, and device integration (RFID, barcode, UWB) to reduce delivery variance by double digits.",
      ],
      badges: ["Mobile Development", "Technical Leadership", "RFID & IoT"],
    },
    {
      title: "Software Engineer",
      company: "Naso Technologies Pvt Ltd",
      location: "Chennai, India",
      startDate: "May 2012",
      endDate: "Dec 2014",
      description: [
        "Delivered HIPAA-aligned mPathy mental-health assessments with WebRTC consults, offline interview capture, and automated sync safeguards.",
        "Built the mFirst mobility framework to accelerate Android deployments with cloud content controls, push orchestration, and modular UX delivery.",
        "Prototyped Google Glass surgical capture for Lifeline Hospital, enabling live OR streaming and clinician collaboration on wearable hardware.",
      ],
      badges: ["Android", "Product Delivery", "Client Solutions"],
    },
  ],
  education: [
    {
      credential: "Masters of Computer Application",
      school: "University of Madras",
      location: "Chennai, India",
      startDate: "2009",
      endDate: "2012",
      highlights: [],
    },
    {
      credential: "Bachelor of Computer Application",
      school: "Thiruthangal Nadar College",
      location: "Chennai, India",
      startDate: "2006",
      endDate: "2009",
      highlights: [],
    },
  ],
  skills: [
    {
      name: "Mobile Platform Engineering",
      items: ["Android", "iOS", "Kotlin", "Swift", "Jetpack Compose", "MVI Architecture", "App State Serialization"],
    },
    {
      name: "Platform Strategy",
      items: ["Mobile Platform Strategy", "Reusable Component Design", "Performance & Security Governance", "Program Roadmapping"],
    },
    {
      name: "Leadership & Collaboration",
      items: ["Engineering Leadership", "Cross-Functional Alignment", "Mentorship & Coaching"],
    },
  ],
  projects: [
    {
      name: "7-Eleven — Mobile Platform",
      company: "7-Eleven",
      description:
        "Leading three cross-functional engineering squads delivering the reusable mobile platform powering the 7-Eleven and Speedway consumer apps.",
      technologies: ["Android", "iOS", "Kotlin", "Swift", "Platform Strategy"],
      links: [],
      year: "2024—Present",
    },
    {
      name: "Wayfair — Nexus",
      company: "Wayfair",
      description:
        "Led the rollout of an Android framework powering 55+ supply chain workflows as Wayfair migrated from RF scanners to Zebra devices.",
      technologies: ["Android", "Kotlin", "Jetpack", "Zebra Devices"],
      links: [],
      year: "2019—2024",
    },
    {
      name: "7-Eleven — Mobile Checkout",
      company: "7-Eleven",
      description:
        "Partnered with store operations to prototype self-checkout stations and integrate iBeacon-driven proximity detection in the Android app.",
      technologies: ["Android", "Java", "iBeacon", "Retail Tech"],
      links: [],
      year: "2017—2019",
    },
    {
      name: "TrackX — Asset Management",
      company: "Fusion Global Technologies",
      client: "TrackX",
      description:
        "Led the TrueMobile Android suite with camera, RFID, and barcode integrations to help enterprises inventory and locate assets in real time.",
      technologies: ["Android", "Room", "RFID", "Barcode Scanning"],
      links: [],
      year: "2014—2017",
    },
    {
      name: "mPathy Mental Health Platform",
      company: "Naso Technologies",
      client: "mPathy",
      description:
        "Built Android assessments with WebRTC consults, offline interview capture, and automated sync to support case managers delivering in-home care.",
      technologies: ["Android", "Java", "WebRTC", "Offline Sync"],
      links: [],
      year: "2013—2014",
    },
    {
      name: "mFirst Mobility Framework",
      company: "Naso Technologies",
      description:
        "Created a configurable Android framework with cloud CMS controls, push orchestration, and wearable/IoT readiness to speed enterprise rollouts.",
      technologies: ["Android", "Java", "Cloud CMS", "Push Messaging"],
      links: [],
      year: "2013—2014",
    },
    {
      name: "Lifeline Hospital Google Glass Streaming",
      company: "Naso Technologies",
      client: "Lifeline Hospital",
      description:
        "Delivered a surgical recording prototype on Google Glass, enabling live OR streaming and remote clinician collaboration.",
      technologies: ["Android", "Google Glass", "Wearables", "Video Streaming"],
      links: [],
      year: "2013",
    },
  ],
  contact: {
    headline: "Let's build something together",
    description:
      "Interested in discussing mobile strategy, platform engineering, or building high-performing teams? Let's talk.",
    email: "hello@nagarajan.dev",
  },
};
