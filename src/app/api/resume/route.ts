import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Generate professional PDF from markdown
    const pdfBuffer = await generateProfessionalResumePdf(markdownContent);

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Nagarajan Ravikumar.pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    return new NextResponse("Error generating resume PDF", { status: 500 });
  }
}

// Generate professional resume PDF from markdown
async function generateProfessionalResumePdf(markdown: string): Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const puppeteer = require("puppeteer");

    // Create professional HTML from markdown
    const htmlContent = createProfessionalResumeHtml(markdown);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "0.4in", right: "0.5in", bottom: "0.4in", left: "0.5in" },
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer as Buffer;
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}

// Create professional resume HTML from markdown
function createProfessionalResumeHtml(markdown: string): string {
  // Parse markdown into sections
  const sections = parseResumeMarkdown(markdown);

  // Build HTML manually to avoid complex template literals
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nagarajan Ravikumar - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11px; line-height: 1.4; color: #000; }
    .container { max-width: 8.5in; margin: 0 auto; padding: 0.4in 0.5in; }
    .header { text-align: center; margin-bottom: 8px; border-bottom: 2px solid #000; padding-bottom: 6px; }
    .name { font-size: 16px; font-weight: bold; margin-bottom: 2px; }
    .contact-info { font-size: 10px; line-height: 1.3; }
    .contact-info span { margin: 0 6px; }
    .section { margin-bottom: 8px; }
    .section-title { font-size: 12px; font-weight: bold; background-color: #f0f0f0; padding: 4px 6px; margin-bottom: 4px; border-left: 3px solid #000; text-transform: uppercase; }
    .summary { font-size: 10px; line-height: 1.4; margin-bottom: 4px; }
    .competency-group { margin-bottom: 3px; font-size: 10px; }
    .competency-label { font-weight: bold; }
    .job { margin-bottom: 6px; }
    .job-title { font-weight: bold; font-size: 11px; margin-bottom: 1px; }
    .job-company { font-size: 10px; margin-bottom: 1px; }
    .job-dates { font-size: 10px; color: #333; margin-bottom: 2px; }
    .job-description { font-size: 10px; line-height: 1.3; margin-left: 12px; }
    .job-description li { margin-bottom: 2px; }
    .education-item { margin-bottom: 4px; font-size: 10px; }
    .degree { font-weight: bold; margin-bottom: 1px; }
    .school { font-size: 10px; margin-bottom: 1px; }
    .years { font-size: 10px; color: #333; }
    .additional-info { font-size: 10px; line-height: 1.3; margin-bottom: 2px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="name">NAGARAJAN RAVIKUMAR</div>
      <div class="contact-info">
        <span>469-933-3360</span>
        <span>naga@nagarajanr.com</span>
        <span>linkedin.com/in/nagarajanr0</span>
        <span>github.com/rnagarajanmca</span>
      </div>
    </div>`;

  // Add Professional Summary
  if (sections.summary) {
    html += `<div class="section">
      <div class="section-title">Professional Summary</div>
      <div class="summary">${escapeHtml(sections.summary as string)}</div>
    </div>`;
  }

  // Add Core Competencies
  if (sections.competencies && Array.isArray(sections.competencies)) {
    html += `<div class="section">
      <div class="section-title">Core Competencies</div>`;
    for (const comp of sections.competencies as Array<{ category: string; items: string }>) {
      html += `<div class="competency-group">
        <span class="competency-label">${escapeHtml(comp.category)}:</span>
        <span>${escapeHtml(comp.items)}</span>
      </div>`;
    }
    html += `</div>`;
  }

  // Add Professional Experience
  if (sections.experience && Array.isArray(sections.experience)) {
    html += `<div class="section">
      <div class="section-title">Professional Experience</div>`;
    for (const job of sections.experience as Array<{ title: string; company: string; dates: string; bullets: string[] }>) {
      html += `<div class="job">
        <div class="job-title">${escapeHtml(job.title)}</div>
        <div class="job-company">${escapeHtml(job.company)}</div>
        <div class="job-dates">${escapeHtml(job.dates)}</div>
        <ul class="job-description">`;
      for (const bullet of job.bullets) {
        html += `<li>${escapeHtml(bullet)}</li>`;
      }
      html += `</ul></div>`;
    }
    html += `</div>`;
  }

  // Add Education
  if (sections.education && Array.isArray(sections.education)) {
    html += `<div class="section">
      <div class="section-title">Education</div>`;
    for (const edu of sections.education as Array<{ degree: string; school: string; years: string }>) {
      html += `<div class="education-item">
        <div class="degree">${escapeHtml(edu.degree)}</div>
        <div class="school">${escapeHtml(edu.school)}</div>
        <div class="years">${escapeHtml(edu.years)}</div>
      </div>`;
    }
    html += `</div>`;
  }

  // Add Additional Information
  if (sections.additional && Array.isArray(sections.additional)) {
    html += `<div class="section">
      <div class="section-title">Additional Information</div>`;
    for (const item of sections.additional as string[]) {
      html += `<div class="additional-info">${escapeHtml(item)}</div>`;
    }
    html += `</div>`;
  }

  html += `</div></body></html>`;
  return html;
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Parse resume markdown into structured sections
function parseResumeMarkdown(markdown: string): Record<string, unknown> {
  const sections: Record<string, unknown> = {};
  const lines = markdown.split("\n");
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("# ")) {
      // Main title - skip
      continue;
    } else if (line.startsWith("## ")) {
      // Section header
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = processSection(currentSection, currentContent);
      }
      currentSection = line.replace(/^## /, "").toLowerCase().replace(/\s+/g, "_");
      currentContent = [];
    } else if (line.trim()) {
      currentContent.push(line);
    }
  }

  // Process last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = processSection(currentSection, currentContent);
  }

  return sections;
}

// Process section content based on section type
function processSection(sectionName: string, content: string[]): unknown {
  const text = content.join("\n").trim();

  if (sectionName === "professional_summary") {
    return text.replace(/\*\*/g, "").replace(/\n/g, " ");
  }

  if (sectionName === "core_competencies") {
    const competencies: Array<{ category: string; items: string }> = [];
    let currentCategory = "";
    let currentItems = "";

    for (const line of content) {
      if (line.startsWith("**") && line.includes(":")) {
        if (currentCategory) {
          competencies.push({
            category: currentCategory,
            items: currentItems.trim(),
          });
        }
        currentCategory = line.replace(/\*\*/g, "").replace(":", "").trim();
        currentItems = "";
      } else if (line.trim()) {
        currentItems += line.replace(/\*\*/g, "").trim() + " ";
      }
    }

    if (currentCategory) {
      competencies.push({
        category: currentCategory,
        items: currentItems.trim(),
      });
    }

    return competencies;
  }

  if (sectionName === "professional_experience") {
    const jobs: Array<{
      title: string;
      company: string;
      dates: string;
      bullets: string[];
    }> = [];
    let currentJob: {
      title: string;
      company: string;
      dates: string;
      bullets: string[];
    } | null = null;

    for (const line of content) {
      if (line.startsWith("### ")) {
        if (currentJob) {
          jobs.push(currentJob);
        }
        currentJob = {
          title: line.replace(/^### /, "").trim(),
          company: "",
          dates: "",
          bullets: [],
        };
      } else if (currentJob && line.startsWith("**") && !line.startsWith("- ")) {
        const parts = line.replace(/\*\*/g, "").split("|");
        if (parts.length >= 2) {
          currentJob.company = parts[0].trim();
          currentJob.dates = parts.slice(1).join("|").trim();
        }
      } else if (currentJob && line.startsWith("- ")) {
        currentJob.bullets.push(line.replace(/^- /, "").trim());
      }
    }

    if (currentJob) {
      jobs.push(currentJob);
    }

    return jobs;
  }

  if (sectionName === "education") {
    const education: Array<{
      degree: string;
      school: string;
      years: string;
    }> = [];
    let currentEdu: { degree: string; school: string; years: string } | null =
      null;

    for (const line of content) {
      if (line.startsWith("**") && !line.includes("|")) {
        if (currentEdu) {
          education.push(currentEdu);
        }
        currentEdu = {
          degree: line.replace(/\*\*/g, "").trim(),
          school: "",
          years: "",
        };
      } else if (currentEdu && line.trim()) {
        const parts = line.split("|");
        if (parts.length >= 2) {
          currentEdu.school = parts[0].trim();
          currentEdu.years = parts.slice(1).join("|").trim();
        }
      }
    }

    if (currentEdu) {
      education.push(currentEdu);
    }

    return education;
  }

  if (sectionName === "additional_information") {
    const items: string[] = [];
    for (const line of content) {
      if (line.startsWith("- ")) {
        items.push(line.replace(/^- /, "").trim());
      }
    }
    return items;
  }

  return null;
}




