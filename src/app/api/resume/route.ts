import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Generate professional PDF from markdown
    const pdfBuffer = await generateProfessionalResumePdf(markdownContent);

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

// Generate professional resume PDF using pdf-lib
async function generateProfessionalResumePdf(markdown: string): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PDFDocument, rgb } = require("pdf-lib");

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { height } = page.getSize();

  const lines = markdown.split("\n");
  let yPosition = height - 40;
  const margin = 40;
  const pageBottomMargin = 40;

  for (const line of lines) {
    if (!line.trim()) {
      yPosition -= 8;
      continue;
    }

    // Check for page break
    if (yPosition < pageBottomMargin + 60) {
      const newPage = pdfDoc.addPage([612, 792]);
      yPosition = newPage.getHeight() - 40;
    }

    let fontSize = 10;
    let text = line;
    let lineHeight = 13;
    let isBold = false;

    // Parse markdown formatting
    if (line.startsWith("# ")) {
      fontSize = 18;
      text = line.replace(/^# /, "");
      lineHeight = 22;
      isBold = true;
    } else if (line.startsWith("## ")) {
      fontSize = 13;
      text = line.replace(/^## /, "");
      lineHeight = 16;
      isBold = true;
    } else if (line.startsWith("### ")) {
      fontSize = 11;
      text = line.replace(/^### /, "");
      lineHeight = 14;
      isBold = true;
    } else if (line.startsWith("- ")) {
      fontSize = 10;
      text = "• " + line.replace(/^- /, "");
      lineHeight = 13;
    } else {
      lineHeight = 13;
    }

    // Remove markdown formatting
    text = text.replace(/\*\*/g, "").replace(/\*/g, "");

    // Draw text
    const fontName = isBold ? "Helvetica-Bold" : "Helvetica";
    page.drawText(text, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font: await pdfDoc.embedFont(fontName),
      color: rgb(0, 0, 0),
      maxWidth: 532,
      lineHeight: lineHeight,
    });

    yPosition -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}





