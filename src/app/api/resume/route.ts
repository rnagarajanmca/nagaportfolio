import { NextResponse } from "next/server";
import { buildResumeTemplateData, renderResumeHtml } from "@/lib/resumeTemplate";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

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
  let browser;
  try {
    const templateData = buildResumeTemplateData();
    const html = renderResumeHtml(templateData);

    console.log("Launching Puppeteer...");
    // Launch Puppeteer with Chromium optimized for serverless
    const executablePath = await chromium.executablePath();
    console.log("Chromium executable path:", executablePath);

    browser = await puppeteer.launch({
      args: [...(chromium.args || []), "--disable-dev-shm-usage"],
      executablePath,
      headless: true,
    });

    console.log("Creating new page...");
    const page = await browser.newPage();
    
    console.log("Setting page content...");
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    console.log("Generating PDF...");
    // Generate PDF with proper formatting
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "18mm",
        left: "15mm",
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log("PDF generated, closing browser...");
    await browser.close();
    console.log("PDF generation complete");
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
    throw error;
  }
}
