import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume markdown file
    const resumeMdPath = join(process.cwd(), "public", "resume.md");
    const markdownContent = await readFile(resumeMdPath, "utf-8");

    // Generate PDF from markdown
    const pdfBuffer = await generatePdfFromMarkdown(markdownContent);

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

// Generate PDF from markdown using pdf-lib
async function generatePdfFromMarkdown(markdown: string): Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PDFDocument, rgb } = require("pdf-lib");

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([612, 792]); // Letter size
    let yPosition = 750;
    const pageHeight = 792;
    const margin = 50;
    const maxWidth = 512;

    const lines = markdown.split("\n");
    let currentFontSize = 11;

    for (const line of lines) {
      if (line.trim() === "") {
        yPosition -= 10;
        continue;
      }

      // Check if we need a new page
      if (yPosition < margin + 20) {
        page = pdfDoc.addPage([612, 792]);
        yPosition = pageHeight - margin;
      }

      // Headers
      if (line.startsWith("# ")) {
        const text = line.replace(/^# /, "");
        page.drawText(text, {
          x: margin,
          y: yPosition,
          size: 20,
          color: rgb(0, 0, 0),
          maxWidth: maxWidth,
        });
        yPosition -= 25;
      } else if (line.startsWith("## ")) {
        const text = line.replace(/^## /, "");
        page.drawText(text, {
          x: margin,
          y: yPosition,
          size: 13,
          color: rgb(0.1, 0.1, 0.1),
        });
        yPosition -= 18;
      } else if (line.startsWith("### ")) {
        const text = line.replace(/^### /, "");
        page.drawText(text, {
          x: margin,
          y: yPosition,
          size: 11,
          color: rgb(0.2, 0.2, 0.2),
        });
        yPosition -= 15;
      } else if (line.startsWith("- ")) {
        const text = line.replace(/^- /, "");
        page.drawText(`• ${text}`, {
          x: margin + 15,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
          maxWidth: maxWidth - 15,
        });
        yPosition -= 12;
      } else if (line.startsWith("---")) {
        // Draw a line
        page.drawLine({
          start: { x: margin, y: yPosition },
          end: { x: 612 - margin, y: yPosition },
          thickness: 1,
          color: rgb(0.8, 0.8, 0.8),
        });
        yPosition -= 15;
      } else {
        // Regular text
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
          maxWidth: maxWidth,
        });
        yPosition -= 12;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}



