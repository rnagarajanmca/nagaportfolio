import { z } from "zod";
import { siteContent } from "./site";

// Zod schemas matching TypeScript interfaces
const navLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Href is required"),
});

const ctaLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Href is required"),
  variant: z.enum(["primary", "secondary"]).optional(),
  target: z.string().optional(),
  rel: z.string().optional(),
  download: z.boolean().optional(),
});

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  href: z.string().min(1, "Href is required"),
});

const heroMetricSchema = z.object({
  label: z.string().min(1, "Metric label is required"),
  value: z.string().min(1, "Metric value is required"),
  description: z.string().optional(),
});

const heroContentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  typingPhrases: z.array(z.string().min(1)).min(1, "At least one typing phrase is required"),
  cta: z.array(ctaLinkSchema).min(1, "At least one CTA is required"),
  social: z.array(socialLinkSchema).min(1, "At least one social link is required"),
  metrics: z.array(heroMetricSchema).optional(),
});

const aboutContentSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  body: z.array(z.string().min(1)).min(1, "At least one body paragraph is required"),
});

const experienceItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.array(z.string().min(1)).min(1, "At least one description is required"),
  badges: z.array(z.string()).optional(),
});

const educationItemSchema = z.object({
  school: z.string().min(1, "School is required"),
  credential: z.string().min(1, "Credential is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  highlights: z.array(z.string()),
});

const skillCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  items: z.array(z.string().min(1)).min(1, "At least one skill item is required"),
});

const contactContentSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  description: z.string().min(1, "Description is required"),
  email: z.string().email("Invalid email address"),
});

const projectLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Href is required"),
});

const projectItemSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string().min(1)).min(1, "At least one technology is required"),
  links: z.array(projectLinkSchema),
  year: z.string().min(1, "Year is required"),
});

const siteContentSchema = z.object({
  navigation: z.array(navLinkSchema).min(1, "At least one navigation link is required"),
  hero: heroContentSchema,
  about: aboutContentSchema,
  experience: z.array(experienceItemSchema).min(1, "At least one experience item is required"),
  education: z.array(educationItemSchema),
  skills: z.array(skillCategorySchema).min(1, "At least one skill category is required"),
  projects: z.array(projectItemSchema),
  contact: contactContentSchema,
});

/**
 * Validates the site content against the Zod schema
 * @param content - The site content to validate
 * @returns Validation result with success flag and errors if any
 */
export function validateSiteContent(content: unknown): {
  success: boolean;
  errors?: z.ZodError;
} {
  try {
    siteContentSchema.parse(content);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

/**
 * Validates site content and throws if invalid (for use in build/startup)
 * @throws {z.ZodError} If content is invalid
 */
export function assertValidSiteContent(content: unknown): void {
  const result = validateSiteContent(content);
  if (!result.success && result.errors) {
    console.error("❌ Site content validation failed:");
    result.errors.issues.forEach((issue) => {
      const path = issue.path.join(".");
      console.error(`  - ${path}: ${issue.message}`);
    });
    throw new Error("Site content validation failed. See errors above.");
  }
}

// Validate on import (runs at build/startup time)
if (typeof window === "undefined") {
  assertValidSiteContent(siteContent);
}

