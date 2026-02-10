import { NextResponse } from "next/server";
import { buildResumeTemplateData, renderResumeHtml } from "@/lib/resumeTemplate";
import { jsPDF } from "jspdf";

let cachedPdf: Buffer | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

export async function GET() {
  try {
    const now = Date.now();
    if (cachedPdf && now - cachedAt < CACHE_TTL_MS) {
      console.log("Returning cached PDF");
      return sendPdfResponse(cachedPdf);
    }

    console.log("Generating new PDF...");
    const pdfBuffer = await generateHtmlTemplateResumePdf();
    cachedPdf = pdfBuffer;
    cachedAt = now;

    return sendPdfResponse(pdfBuffer);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new NextResponse(`Error generating resume PDF: ${errorMessage}`, { status: 500 });
  }
}

function sendPdfResponse(pdfBuffer: Buffer) {
  return new NextResponse(pdfBuffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Nagarajan Ravikumar.pdf",
      "Content-Length": pdfBuffer.length.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}

async function generateHtmlTemplateResumePdf(): Promise<Buffer> {
  try {
    const templateData = buildResumeTemplateData();

    // Create PDF with text content directly (Vercel-compatible)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Helper to add text with wrapping
    const addText = (text: string, fontSize: number, isBold = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = pdf.splitTextToSize(text, contentWidth);
      const lineHeight = fontSize * 0.5;

      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 2; // Extra space after text block
    };

    // Header
    addText(templateData.name, 16, true);
    addText(templateData.title, 11);
    yPosition += 3;

    // Contact
    templateData.contactLines.forEach((line) => {
      const cleanLine = line.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "");
      addText(cleanLine, 9);
    });
    yPosition += 5;

    // Summary
    addText("PROFESSIONAL SUMMARY", 12, true);
    templateData.summary.forEach((para) => {
      addText(para, 10);
    });
    yPosition += 3;

    // Experience
    addText("PROFESSIONAL EXPERIENCE", 12, true);
    templateData.experiences.forEach((exp) => {
      addText(`${exp.title} at ${exp.company}`, 11, true);
      addText(`${exp.location} | ${exp.period}`, 9);
      exp.bullets.forEach((bullet) => {
        addText(`• ${bullet}`, 10);
      });
      yPosition += 2;
    });
    yPosition += 3;

    // Education
    addText("EDUCATION", 12, true);
    templateData.education.forEach((edu) => {
      addText(edu.credential, 11, true);
      addText(`${edu.school} | ${edu.years}`, 10);
      yPosition += 2;
    });

    return Buffer.from(pdf.output("arraybuffer"));
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}
