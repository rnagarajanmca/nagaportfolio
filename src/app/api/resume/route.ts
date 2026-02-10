import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Generate professional PDF from markdown using fast text-based approach
    const pdfBuffer = generateFastResumePdf(markdownContent);

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

// Generate fast, professional resume PDF using text-based approach
function generateFastResumePdf(markdown: string): Buffer {
  const lines = markdown.split("\n");
  const pdfLines: string[] = [];
  let yPosition = 750;
  const pageHeight = 792;
  const margin = 40;
  const lineHeight = 11;
  let pageNum = 1;

  // PDF header
  pdfLines.push("%PDF-1.4");
  pdfLines.push("1 0 obj");
  pdfLines.push("<< /Type /Catalog /Pages 2 0 R >>");
  pdfLines.push("endobj");
  pdfLines.push("2 0 obj");
  pdfLines.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  pdfLines.push("endobj");
  pdfLines.push("3 0 obj");
  pdfLines.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>");
  pdfLines.push("endobj");
  pdfLines.push("4 0 obj");
  pdfLines.push("<< /Length 0 >>");
  pdfLines.push("stream");

  const contentStart = pdfLines.length;

  // Process markdown lines
  for (const line of lines) {
    if (!line.trim()) continue;

    let fontSize = 10;
    let fontName = "/F1";
    let text = line;

    // Determine formatting
    if (line.startsWith("# ")) {
      fontSize = 18;
      fontName = "/F2";
      text = line.replace(/^# /, "");
      yPosition -= 5;
    } else if (line.startsWith("## ")) {
      fontSize = 13;
      fontName = "/F2";
      text = line.replace(/^## /, "");
      yPosition -= 3;
    } else if (line.startsWith("### ")) {
      fontSize = 11;
      fontName = "/F2";
      text = line.replace(/^### /, "");
      yPosition -= 2;
    } else if (line.startsWith("- ")) {
      text = "• " + line.replace(/^- /, "");
    }

    // Remove markdown formatting
    text = text.replace(/\*\*/g, "").replace(/\*/g, "");

    // Check for page break
    if (yPosition < margin + 20) {
      yPosition = pageHeight - margin;
      pageNum++;
    }

    // Add text to PDF
    const encodedText = encodePdfText(text);
    pdfLines.push(`BT`);
    pdfLines.push(`${fontName} ${fontSize} Tf`);
    pdfLines.push(`${margin} ${yPosition} Td`);
    pdfLines.push(`(${encodedText}) Tj`);
    pdfLines.push(`ET`);

    yPosition -= lineHeight;
  }

  pdfLines.push("endstream");
  pdfLines.push("endobj");

  // Font definitions
  pdfLines.push("5 0 obj");
  pdfLines.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  pdfLines.push("endobj");
  pdfLines.push("6 0 obj");
  pdfLines.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  pdfLines.push("endobj");

  // Xref table
  const xrefOffset = pdfLines.length;
  pdfLines.push("xref");
  pdfLines.push("0 7");
  pdfLines.push("0000000000 65535 f");
  pdfLines.push("0000000009 00000 n");
  pdfLines.push("0000000058 00000 n");
  pdfLines.push("0000000115 00000 n");
  pdfLines.push("0000000244 00000 n");
  pdfLines.push(`${String(contentStart * 50).padStart(10, "0")} 00000 n`);
  pdfLines.push(`${String((contentStart + 10) * 50).padStart(10, "0")} 00000 n`);

  pdfLines.push("trailer");
  pdfLines.push("<< /Size 7 /Root 1 0 R >>");
  pdfLines.push("startxref");
  pdfLines.push(String(xrefOffset * 50));
  pdfLines.push("%%EOF");

  return Buffer.from(pdfLines.join("\n"));
}

// Encode text for PDF
function encodePdfText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .substring(0, 200); // Limit line length
}





