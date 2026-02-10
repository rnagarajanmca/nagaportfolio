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
    const html = renderResumeHtml(templateData);

    // Create PDF directly from HTML string using jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Use html method if available, otherwise use text-based fallback
    const pdfWithHtml = pdf as { html?: (html: string, options: Record<string, number>) => Promise<void> };
    if (typeof pdfWithHtml.html === "function") {
      console.log("Using jsPDF html method");
      await pdfWithHtml.html(html, {
        x: 15,
        y: 15,
        width: 180,
        windowHeight: 800,
      });
    } else {
      console.log("html method not available, using simple text rendering");
      // Fallback: extract text from HTML and render as text
      const textContent = extractTextFromHtml(html);
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(textContent, 180);
      pdf.text(lines, 15, 15);
    }

    return Buffer.from(pdf.output("arraybuffer"));
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}

function extractTextFromHtml(html: string): string {
  // Simple HTML to text extraction
  return html
    .replace(/<[^>]*>/g, " ") // Remove HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}
