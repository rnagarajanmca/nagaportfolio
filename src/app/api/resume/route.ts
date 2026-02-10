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

// Generate PDF from HTML using jsPDF and html2canvas
async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const jsPDF = require("jspdf").jsPDF;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const html2canvas = require("html2canvas").default;

    // Create a temporary DOM element with the HTML content
    const element = typeof document !== "undefined" ? document.createElement("div") : null;
    
    if (!element) {
      // Server-side: use a simple text-based PDF generation
      return generateSimplePdf(htmlContent);
    }

    element.innerHTML = htmlContent;
    element.style.padding = "20px";
    element.style.backgroundColor = "white";

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Create PDF from canvas
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    let heightLeft = canvas.height * (imgWidth / canvas.width);
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, heightLeft);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - canvas.height * (imgWidth / canvas.width);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, heightLeft);
      heightLeft -= pageHeight;
    }

    return Buffer.from(pdf.output("arraybuffer"));
  } catch (error) {
    console.error("PDF generation with jsPDF failed:", error);
    // Fallback to simple PDF
    return generateSimplePdf(htmlContent);
  }
}

// Fallback: Generate a simple PDF with text content
function generateSimplePdf(htmlContent: string): Buffer {
  // Strip HTML tags and create simple text PDF
  const text = htmlContent
    .replace(/<[^>]*>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .split("\n")
    .filter((line) => line.trim())
    .join("\n");

  // Create a minimal but valid PDF with text content
  const lines = text.split("\n").slice(0, 100); // Limit to first 100 lines
  let yPosition = 750;
  let pageContent = "";

  for (const line of lines) {
    if (yPosition < 50) {
      pageContent += `endstream\nendobj\n`;
      yPosition = 750;
    }
    const encodedLine = line.replace(/[()\\]/g, "\\$&");
    pageContent += `BT\n/F1 10 Tf\n50 ${yPosition} Td\n(${encodedLine}) Tj\nET\n`;
    yPosition -= 15;
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

// Convert markdown to HTML
function markdownToHtml(markdown: string): string {
  let html = markdown
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^---$/gm, "<hr>")
    .replace(/^\- (.*?)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[a-z])/gm, "<p>");

  html = html.replace(/(<li>[\s\S]*?<\/li>)/, "<ul>$1</ul>");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
    h1 { font-size: 24px; margin-bottom: 10px; border-bottom: 2px solid #333; }
    h2 { font-size: 14px; margin-top: 15px; margin-bottom: 8px; color: #333; }
    h3 { font-size: 12px; margin-top: 10px; }
    p { font-size: 10px; margin: 5px 0; }
    ul { margin-left: 20px; }
    li { font-size: 10px; margin: 3px 0; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}


