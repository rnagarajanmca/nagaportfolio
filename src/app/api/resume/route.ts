import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Convert markdown to HTML
    const htmlContent = markdownToHtml(markdownContent);

    // Generate PDF from HTML
    const pdfBuffer = await generatePdfFromHtml(htmlContent);

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

// Convert markdown to HTML
function markdownToHtml(markdown: string): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { marked } = require("marked");

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  let html = marked(markdown);

  // Wrap in proper HTML structure
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.5; color: #333; }
    .container { max-width: 8.5in; margin: 0 auto; padding: 0.5in; }
    h1 { font-size: 28px; margin: 20px 0 10px; text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 14px; margin: 15px 0 8px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
    h3 { font-size: 12px; margin: 10px 0 5px; color: #555; }
    p { margin: 8px 0; font-size: 10px; line-height: 1.4; }
    ul { margin: 8px 0 8px 20px; font-size: 10px; }
    li { margin: 4px 0; line-height: 1.4; }
    strong { font-weight: 600; }
    em { font-style: italic; }
    hr { border: none; border-top: 1px solid #ccc; margin: 15px 0; }
    @media print { body { margin: 0; padding: 0; } }
  </style>
</head>
<body>
  <div class="container">
    ${html}
  </div>
</body>
</html>`;
}

// Generate PDF from HTML using a server-side approach
async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  try {
    // Try using Puppeteer if available
    return await generatePdfWithPuppeteer(htmlContent);
  } catch (error) {
    console.error("Puppeteer not available, using fallback PDF generation");
    // Fallback to simple text-based PDF
    return generateSimplePdfFromHtml(htmlContent);
  }
}

// Generate PDF using Puppeteer (if available)
async function generatePdfWithPuppeteer(htmlContent: string): Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const puppeteer = require("puppeteer");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "0.5in", right: "0.75in", bottom: "0.5in", left: "0.75in" },
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer as Buffer;
  } catch (error) {
    throw error;
  }
}

// Fallback: Generate PDF from HTML by extracting text
function generateSimplePdfFromHtml(htmlContent: string): Buffer {
  // Extract text from HTML
  const text = htmlContent
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]*>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\*\*/g, "")
    .replace(/\*\*/g, "")
    .split("\n")
    .filter((line) => line.trim())
    .join("\n");

  // Create PDF with proper text rendering
  const lines = text.split("\n").slice(0, 150);
  let yPosition = 750;
  let pageContent = "";
  let pageCount = 1;

  for (const line of lines) {
    if (yPosition < 50) {
      pageContent += `endstream\nendobj\n`;
      pageCount++;
      yPosition = 750;
    }

    const encodedLine = line
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
    pageContent += `BT\n/F1 10 Tf\n50 ${yPosition} Td\n(${encodedLine}) Tj\nET\n`;
    yPosition -= 12;
  }

  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${pageContent.length} >>
stream
${pageContent}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
${(244 + pageContent.length + 50).toString().padStart(10, "0")} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${(244 + pageContent.length + 100).toString()}
%%EOF`;

  return Buffer.from(pdfContent);
}




