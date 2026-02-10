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

// Generate professional resume PDF using pdfkit
async function generateProfessionalResumePdf(markdown: string): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const PDFDocument = require("pdfkit");

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);

    // Parse and render resume
    renderResume(doc, markdown);
    doc.end();
  });
}

// Render resume content to PDF
function renderResume(doc: any, markdown: string): void {
  const lines = markdown.split("\n");
  let isFirstLine = true;

  for (const line of lines) {
    if (!line.trim()) {
      doc.moveDown(0.3);
      continue;
    }

    // Remove markdown formatting
    let text = line.replace(/\*\*/g, "").replace(/\*/g, "");

    // Handle headers
    if (line.startsWith("# ")) {
      text = line.replace(/^# /, "");
      if (!isFirstLine) doc.moveDown(0.5);
      doc.fontSize(18).font("Helvetica-Bold").text(text);
      doc.moveDown(0.2);
      isFirstLine = false;
    } else if (line.startsWith("## ")) {
      text = line.replace(/^## /, "");
      doc.moveDown(0.3);
      doc.fontSize(12).font("Helvetica-Bold").text(text);
      doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown(0.2);
    } else if (line.startsWith("### ")) {
      text = line.replace(/^### /, "");
      doc.fontSize(11).font("Helvetica-Bold").text(text);
      doc.moveDown(0.1);
    } else if (line.startsWith("- ")) {
      text = line.replace(/^- /, "");
      doc.fontSize(10).font("Helvetica").text(`• ${text}`, { indent: 20 });
      doc.moveDown(0.1);
    } else if (line.startsWith("**") && line.includes("|")) {
      // Job title and company line
      const parts = text.split("|").map(p => p.trim());
      doc.fontSize(10).font("Helvetica").text(parts.join(" | "));
      doc.moveDown(0.1);
    } else {
      // Regular text
      doc.fontSize(10).font("Helvetica").text(text, { align: "left" });
      doc.moveDown(0.1);
    }
  }
}





