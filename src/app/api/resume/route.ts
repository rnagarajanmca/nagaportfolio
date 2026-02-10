import { NextResponse } from "next/server";
import { buildResumeTemplateData, renderResumeHtml } from "@/lib/resumeTemplate";

export async function GET() {
  try {
    const pdfBuffer = await generateHtmlTemplateResumePdf();
    return sendPdfResponse(pdfBuffer);
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    return new NextResponse("Error generating resume PDF", { status: 500 });
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
