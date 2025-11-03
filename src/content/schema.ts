export interface NavLink {
  label: string;
  href: string;
}

export interface CTALink {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
  download?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface HeroContent {
  name: string;
  title: string;
  summary: string;
  typingPhrases: string[];
  cta: CTALink[];
  social: SocialLink[];
}

export interface AboutContent {
  heading: string;
  body: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  badges?: string[];
}

export interface EducationItem {
  school: string;
  credential: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ContactContent {
  headline: string;
  description: string;
  email: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  year: string;
}

export interface SiteContent {
  navigation: NavLink[];
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  contact: ContactContent;
}
