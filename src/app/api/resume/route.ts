import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Generate professional PDF from markdown
    const pdfBuffer = generateProfessionalResumePdf(markdownContent);

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

// Generate professional resume PDF with proper formatting
function generateProfessionalResumePdf(markdown: string): Buffer {
  const lines = markdown.split("\n");
  const pdfContent: string[] = [];

  // PDF header
  pdfContent.push("%PDF-1.4");
  pdfContent.push("1 0 obj");
  pdfContent.push("<< /Type /Catalog /Pages 2 0 R >>");
  pdfContent.push("endobj");
  pdfContent.push("2 0 obj");
  pdfContent.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  pdfContent.push("endobj");
  pdfContent.push("3 0 obj");
  pdfContent.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>");
  pdfContent.push("endobj");
  pdfContent.push("4 0 obj");
  pdfContent.push("<< /Length 0 >>");
  pdfContent.push("stream");

  const streamStart = pdfContent.length;
  const streamContent: string[] = [];

  let yPos = 750;
  const pageHeight = 792;
  const margin = 40;
  const lineHeight = 12;

  for (const line of lines) {
    if (!line.trim()) {
      yPos -= 6;
      continue;
    }

    // Check for page break
    if (yPos < margin + 40) {
      yPos = pageHeight - margin;
    }

    let fontSize = 10;
    let fontName = "F1";
    let text = line;

    // Parse markdown formatting
    if (line.startsWith("# ")) {
      fontSize = 18;
      fontName = "F2";
      text = line.replace(/^# /, "");
      yPos -= 8;
    } else if (line.startsWith("## ")) {
      fontSize = 13;
      fontName = "F2";
      text = line.replace(/^## /, "");
      yPos -= 6;
    } else if (line.startsWith("### ")) {
      fontSize = 11;
      fontName = "F2";
      text = line.replace(/^### /, "");
      yPos -= 4;
    } else if (line.startsWith("- ")) {
      fontSize = 10;
      text = "• " + line.replace(/^- /, "");
      yPos -= 3;
    } else {
      yPos -= 3;
    }

    // Remove markdown formatting
    text = text.replace(/\*\*/g, "").replace(/\*/g, "");

    // Encode text for PDF
    const encodedText = encodePdfString(text);

    // Add text to stream
    streamContent.push("BT");
    streamContent.push(`/${fontName} ${fontSize} Tf`);
    streamContent.push(`${margin} ${yPos} Td`);
    streamContent.push(`(${encodedText}) Tj`);
    streamContent.push("ET");
  }

  // Add stream content
  const stream = streamContent.join("\n");
  pdfContent.push(stream);
  pdfContent.push("endstream");
  pdfContent.push("endobj");

  // Font definitions
  pdfContent.push("5 0 obj");
  pdfContent.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  pdfContent.push("endobj");
  pdfContent.push("6 0 obj");
  pdfContent.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  pdfContent.push("endobj");

  // Xref table
  const xrefPos = pdfContent.length;
  pdfContent.push("xref");
  pdfContent.push("0 7");
  pdfContent.push("0000000000 65535 f");
  pdfContent.push("0000000009 00000 n");
  pdfContent.push("0000000058 00000 n");
  pdfContent.push("0000000115 00000 n");
  pdfContent.push("0000000244 00000 n");
  pdfContent.push("0000000350 00000 n");
  pdfContent.push("0000000450 00000 n");

  pdfContent.push("trailer");
  pdfContent.push("<< /Size 7 /Root 1 0 R >>");
  pdfContent.push("startxref");
  pdfContent.push(String(xrefPos * 20));
  pdfContent.push("%%EOF");

  return Buffer.from(pdfContent.join("\n"));
}

// Encode string for PDF
function encodePdfString(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .substring(0, 250);
}





