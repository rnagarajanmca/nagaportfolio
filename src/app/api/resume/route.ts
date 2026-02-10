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

// Generate PDF from HTML using Puppeteer
async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
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
    console.error("Puppeteer PDF generation failed:", error);
    return generateSimplePdf();
  }
}

// Fallback: Generate a simple PDF if other methods fail
function generateSimplePdf(): Buffer {
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
<< /Length 44 >>
stream
BT
/F1 12 Tf
50 700 Td
(Resume generation in progress) Tj
ET
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
0000000338 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
417
%%EOF`;

  return Buffer.from(pdfContent);
}

// Convert markdown to professional HTML for PDF printing
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr>")
    // Bullet lists
    .replace(/^\* (.*?)$/gm, "<li>$1</li>")
    .replace(/^\- (.*?)$/gm, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[a-z])/gm, "<p>");

  // Wrap list items in ul tags
  html = html.replace(/(<li>[\s\S]*?<\/li>)/, "<ul>$1</ul>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nagarajan Ravikumar - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 8.5in;
      margin: 0 auto;
      background: white;
      padding: 0.5in;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 600;
      color: #0d1726;
      text-align: center;
      margin-bottom: 10px;
      border-bottom: 2px solid #174a76;
      padding-bottom: 10px;
    }
    
    h2 {
      font-size: 12px;
      font-weight: 700;
      color: #174a76;
      text-transform: uppercase;
      border-bottom: 1px solid #c0c9d8;
      padding-bottom: 5px;
      margin-top: 15px;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
    
    h3 {
      font-size: 11px;
      font-weight: 600;
      color: #0d1726;
      margin-top: 10px;
      margin-bottom: 3px;
    }
    
    p {
      font-size: 10px;
      line-height: 1.5;
      margin-bottom: 8px;
      text-align: justify;
    }
    
    strong {
      font-weight: 600;
      color: #0d1726;
    }
    
    ul {
      margin-left: 20px;
      margin-bottom: 8px;
    }
    
    li {
      font-size: 10px;
      line-height: 1.4;
      margin-bottom: 4px;
      color: #333;
    }
    
    hr {
      border: none;
      border-top: 1px solid #c0c9d8;
      margin: 15px 0;
    }
    
    @media print {
      body {
        padding: 0;
        background: white;
      }
      .container {
        max-width: 100%;
        margin: 0;
        padding: 0.5in;
        box-shadow: none;
      }
      h1, h2, h3, p, li {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    ${html}
  </div>
  <script>
    // Auto-print to PDF on load
    window.addEventListener('load', function() {
      // Check if this is being opened directly (not in iframe)
      if (window.self === window.top) {
        // Optionally auto-print: window.print();
      }
    });
  </script>
</body>
</html>`;
}

