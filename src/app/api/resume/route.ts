import { NextResponse } from "next/server";
import { buildResumeTemplateData, renderResumeHtml } from "@/lib/resumeTemplate";

let cachedPdf: Buffer | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

export async function GET() {
  try {
    const now = Date.now();
    if (cachedPdf && now - cachedAt < CACHE_TTL_MS) {
      return sendPdfResponse(Buffer.from(cachedPdf));
    }

    const pdfBuffer = await generateHtmlTemplateResumePdf();
    cachedPdf = pdfBuffer;
    cachedAt = now;

    return sendPdfResponse(pdfBuffer);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    return new NextResponse("Error generating resume PDF", { status: 500 });
  }
}

function sendPdfResponse(pdfBuffer: Buffer) {
  return new NextResponse(pdfBuffer, {
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
  const templateData = buildResumeTemplateData();
  const html = renderResumeHtml(templateData);

  const htmlPdfModule = await import("html-pdf-node");
  const generatePdf =
    htmlPdfModule.generatePdf ?? htmlPdfModule.default?.generatePdf ?? htmlPdfModule.default;

  if (typeof generatePdf !== "function") {
    throw new Error("html-pdf-node generatePdf function is unavailable");
  }

  const pdfBuffer: Buffer = await generatePdf(
    { content: html },
    {
      format: "A4",
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "18mm",
        left: "15mm",
      },
      printBackground: true,
      preferCSSPageSize: true,
    }
  );

  return pdfBuffer;
}
