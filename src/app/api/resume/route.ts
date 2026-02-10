import { NextResponse } from "next/server";
import { buildResumeTemplateData } from "@/lib/resumeTemplate";
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

    // Create styled PDF matching HTML template design
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Helper to add text with wrapping
    const addText = (text: string, fontSize: number, isBold = false, color = [27, 29, 33] as [number, number, number]) => {
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", isBold ? "bold" : "normal");
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(text, contentWidth);
      const lineHeight = fontSize * 0.35;

      lines.forEach((line: string) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Header - Name
    addText(templateData.name, 24, true, [27, 29, 33]);
    yPosition += 2;

    // Title
    addText(templateData.title, 11, false, [58, 86, 97]);
    yPosition += 3;

    // Contact lines
    pdf.setFontSize(9.5);
    pdf.setTextColor(79, 86, 97);
    templateData.contactLines.forEach((line) => {
      const cleanLine = line.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, "");
      pdf.text(cleanLine, margin, yPosition);
      yPosition += 2.5;
    });
    yPosition += 2;

    // Divider
    pdf.setDrawColor(231, 233, 239);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Summary section
    addText("PROFESSIONAL SUMMARY", 11, true, [27, 29, 33]);
    yPosition += 2;
    templateData.summary.forEach((para) => {
      addText(para, 9.5, false, [27, 29, 33]);
      yPosition += 1;
    });
    yPosition += 2;

    // Divider
    pdf.setDrawColor(231, 233, 239);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Experience section
    addText("PROFESSIONAL EXPERIENCE", 11, true, [27, 29, 33]);
    yPosition += 2;

    templateData.experiences.forEach((exp) => {
      // Title and company
      addText(`${exp.title}`, 10.5, true, [27, 29, 33]);
      yPosition += 1;
      addText(`${exp.company} • ${exp.location}`, 9, false, [58, 86, 97]);
      yPosition += 1;
      addText(exp.period, 8.5, false, [100, 109, 118]);
      yPosition += 2;

      // Bullets
      exp.bullets.forEach((bullet) => {
        addText(`• ${bullet}`, 9, false, [27, 29, 33]);
        yPosition += 0.5;
      });

      // Badges
      if (exp.badges?.length) {
        yPosition += 1;
        pdf.setFontSize(7.5);
        pdf.setTextColor(79, 86, 97);
        const badgeText = exp.badges.join(" • ");
        const badgeLines = pdf.splitTextToSize(badgeText, contentWidth);
        badgeLines.forEach((line: string) => {
          if (yPosition + 2 > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += 2;
        });
      }

      yPosition += 2;
    });

    // Divider
    pdf.setDrawColor(231, 233, 239);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 4;

    // Education section
    addText("EDUCATION", 11, true, [27, 29, 33]);
    yPosition += 2;

    templateData.education.forEach((edu) => {
      addText(edu.credential, 10, true, [27, 29, 33]);
      yPosition += 1;
      addText(`${edu.school}${edu.location ? ` • ${edu.location}` : ""}`, 9, false, [58, 86, 97]);
      yPosition += 1;
      addText(edu.years, 8.5, false, [100, 109, 118]);
      yPosition += 2.5;
    });

    return Buffer.from(pdf.output("arraybuffer"));
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}
