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

    // Create styled PDF with jsPDF (Vercel-compatible, no Chromium needed)
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

    // Helper to add text with wrapping and styling
    const addText = (text: string, fontSize: number, isBold = false, spacing = 2) => {
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = pdf.splitTextToSize(text, contentWidth);
      const lineHeight = fontSize * 0.4;

      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      yPosition += spacing;
    };

    // Header with name and title
    pdf.setTextColor(40, 40, 40);
    addText(templateData.name, 18, true, 1);
    addText(templateData.title, 12, false, 4);

    // Contact info
    pdf.setTextColor(80, 80, 80);
    pdf.setFontSize(9);
    templateData.contactLines.forEach((line) => {
      const cleanLine = line.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "");
      pdf.text(cleanLine, margin, yPosition);
      yPosition += 3;
    });
    yPosition += 3;

    // Divider line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Summary section
    pdf.setTextColor(40, 40, 40);
    addText("PROFESSIONAL SUMMARY", 11, true, 2);
    pdf.setTextColor(60, 60, 60);
    templateData.summary.forEach((para) => {
      addText(para, 10, false, 3);
    });
    yPosition += 2;

    // Divider
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Experience section
    pdf.setTextColor(40, 40, 40);
    addText("PROFESSIONAL EXPERIENCE", 11, true, 2);
    pdf.setTextColor(60, 60, 60);
    
    templateData.experiences.forEach((exp) => {
      pdf.setTextColor(40, 40, 40);
      addText(`${exp.title} — ${exp.company}`, 10, true, 1);
      pdf.setTextColor(100, 100, 100);
      addText(`${exp.location} | ${exp.period}`, 9, false, 2);
      
      pdf.setTextColor(60, 60, 60);
      exp.bullets.forEach((bullet) => {
        addText(`• ${bullet}`, 9, false, 1.5);
      });
      yPosition += 1;
    });

    yPosition += 2;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Education section
    pdf.setTextColor(40, 40, 40);
    addText("EDUCATION", 11, true, 2);
    pdf.setTextColor(60, 60, 60);
    
    templateData.education.forEach((edu) => {
      pdf.setTextColor(40, 40, 40);
      addText(edu.credential, 10, true, 1);
      pdf.setTextColor(100, 100, 100);
      addText(`${edu.school} | ${edu.years}`, 9, false, 3);
    });

    return Buffer.from(pdf.output("arraybuffer"));
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}
