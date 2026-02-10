import type { SiteContent } from "@/content/schema";
import { siteContent } from "@/content/site";

export interface ResumeTemplateData {
  name: string;
  title: string;
  contactLines: string[];
  summary: string[];
  competencies: Array<{ label: string; items: string[] }>;
  experiences: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
    badges?: string[];
  }>;
  education: Array<{
    credential: string;
    school: string;
    location?: string;
    years: string;
  }>;
}

export function buildResumeTemplateData(content: SiteContent = siteContent): ResumeTemplateData {
  const hero = content.hero;
  const socialLinks = content.hero.social
    .filter((social) => social.platform.toLowerCase() !== "email")
    .map((social) => {
      const display = social.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "");
      return `${social.platform}: <a href="${social.href}">${display}</a>`;
    });
  socialLinks.push(`Website: <a href="https://www.nagarajanr.com">nagarajanr.com</a>`);

  const contactLines = [
    `Phone: <a href="tel:+14699333360">469-933-3360</a> | Email: <a href="mailto:naga@nagarajanr.com">naga@nagarajanr.com</a>`,
    socialLinks.join(" | "),
  ].filter((line) => line.trim().length);

  const summary = content.about.body;

  const experiences = content.experience.map((role) => ({
    title: role.title,
    company: role.company,
    location: role.location,
    period: `${role.startDate} – ${role.endDate}`,
    bullets: role.description,
    badges: role.badges,
  }));

  const education = content.education.map((entry) => ({
    credential: entry.credential,
    school: entry.school,
    location: entry.location,
    years: `${entry.startDate} – ${entry.endDate}`,
  }));

  return {
    name: hero.name,
    title: hero.title,
    contactLines,
    summary,
    competencies: [],
    experiences,
    education,
  };
}

const resumeSummaryOverride = [
  "From Mobile Engineer to Technical Manager, with over a decade of experience delivering scalable mobile platforms. Led architecture initiatives and managed teams of 15+ engineers while maintaining rigorous engineering standards.",
];

export function renderResumeHtml(data: ResumeTemplateData): string {
  const { name, title, contactLines, summary, competencies, experiences, education } = data;
  const summaryLines = resumeSummaryOverride.length ? resumeSummaryOverride : summary;

  const contactHtml = contactLines
    .map((line) => `<p class="contact-line">${line}</p>`)
    .join("\n");

  const summaryHtml = summaryLines
    .map((paragraph) => `<p class="body-text">${paragraph}</p>`)
    .join("\n");

  const competencyHtml = "";

  const experienceHtml = experiences
    .map((role) => {
      const badgeHtml = role.badges?.length
        ? `<ul class="badge-list">${role.badges
            .map((badge) => `<li class="badge">${badge}</li>`)
            .join("\n")}</ul>`
        : "";

      return `
        <article class="experience-card">
          <header class="experience-header">
            <div>
              <h3 class="position">${role.title}</h3>
              <p class="company">${role.company} • ${role.location}</p>
            </div>
            <p class="period">${role.period}</p>
          </header>
          <ul class="bullet-list">
            ${role.bullets.map((bullet) => `<li>${bullet}</li>`).join("\n")}
          </ul>
          ${badgeHtml}
        </article>`;
    })
    .join("\n");

  const educationHtml = education
    .map(
      (entry) => `
        <div class="education-item">
          <p class="education-degree">${entry.credential}</p>
          <p class="education-school">${entry.school}${entry.location ? ` • ${entry.location}` : ""}</p>
          <p class="education-years">${entry.years}</p>
        </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        :root {
          --sans: "Inter", "Helvetica", "Arial", sans-serif;
          --serif: "Source Serif 4", "Georgia", "Times New Roman", serif;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: var(--sans);
          margin: 0;
          padding: 24px 48px 20px;
          color: #1b1d21;
          background: #fff;
          line-height: 1.45;
        }
        h1 {
          margin: 0;
          font-size: 29.5px;
          letter-spacing: 0.06em;
          font-family: var(--serif);
          font-weight: 600;
        }
        h2 {
          font-size: 13.5px;
          letter-spacing: 0.22em;
          margin: 20px 0 8px;
          font-family: var(--serif);
          font-weight: 600;
        }
        h3 {
          margin: 0;
          font-family: var(--serif);
          font-weight: 600;
        }
        section + section {
          margin-top: 12px;
        }
        section:last-of-type {
          margin-bottom: 0;
        }
        .education-section {
          margin-top: 6px !important;
        }
        .divider {
          height: 1px;
          background: #e7e9ef;
          margin: 6px 0 10px;
        }
        .divider:last-of-type {
          display: none;
        }
        .contact-line {
          margin: 1px 0;
          font-size: 11.5px;
          color: #4f5661;
        }
        .contact-line a {
          color: inherit;
          text-decoration: none;
        }
        .title-line {
          margin: 4px 0 10px;
          font-weight: 500;
          font-size: 12.5px;
          color: #3a3f47;
        }
        .body-text {
          margin: 4px 0;
          font-size: 11.5px;
        }
        .competency-label {
          font-weight: 600;
          font-size: 11.5px;
          margin: 0 0 2px;
          color: #2f353d;
        }
        .competency-group + .competency-group {
          margin-top: 6px;
        }
        .experience-card {
          border-left: 2px solid #cfd4df;
          padding-left: 12px;
          margin-bottom: 18px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .experience-card:last-of-type {
          margin-bottom: 6px;
        }
        .experience-header {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 6px;
        }
        .position {
          font-size: 12.5px;
          font-weight: 600;
          margin: 0;
        }
        .company,
        .period {
          font-size: 11.5px;
          color: #61666f;
          margin: 0;
        }
        .bullet-list {
          margin: 0 0 6px;
          padding-left: 16px;
          font-size: 11.5px;
          color: #2c2f34;
        }
        .bullet-list li {
          margin-bottom: 2px;
        }
        .badge-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .badge {
          font-size: 10px;
          border: 1px solid #d7dae4;
          border-radius: 999px;
          padding: 2px 8px;
          background: #f7f8fb;
        }
        .education-item {
          margin-bottom: 2px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .education-item + .education-item {
          margin-top: 6px;
        }
        .education-degree {
          margin: 0;
          font-weight: 600;
          font-size: 12.5px;
        }
        .education-school,
        .education-years {
          margin: 0;
          font-size: 11.5px;
          color: #61666f;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>${name}</h1>
        <p class="title-line">${title}</p>
        ${contactHtml}
      </header>
      <div class="divider"></div>
      <section>
        <h2>PROFESSIONAL SUMMARY</h2>
        ${summaryHtml}
      </section>
      <div class="divider"></div>
      <section>
        <h2>PROFESSIONAL EXPERIENCE</h2>
        ${experienceHtml}
      </section>
      <div class="divider"></div>
      <section class="education-section">
        <h2>EDUCATION</h2>
        ${educationHtml}
      </section>
    </body>
  </html>`;
}
