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

// Generate PDF from markdown using pdfkit
async function generatePdfFromMarkdown(markdown: string): Promise<Buffer> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const PDFDocument = require("pdfkit");

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", reject);

      // Parse markdown and add to PDF
      const lines = markdown.split("\n");
      let currentFontSize = 12;
      let isInList = false;

      for (const line of lines) {
        if (line.trim() === "") {
          doc.moveDown(0.3);
          continue;
        }

        // Headers
        if (line.startsWith("# ")) {
          doc.fontSize(24).font("Helvetica-Bold").text(line.replace(/^# /, ""));
          doc.moveDown(0.3);
        } else if (line.startsWith("## ")) {
          doc.fontSize(14).font("Helvetica-Bold").text(line.replace(/^## /, ""));
          doc.moveDown(0.2);
        } else if (line.startsWith("### ")) {
          doc.fontSize(12).font("Helvetica-Bold").text(line.replace(/^### /, ""));
          doc.moveDown(0.1);
        } else if (line.startsWith("- ")) {
          // Bullet point
          doc.fontSize(10).font("Helvetica");
          const bulletText = line.replace(/^- /, "");
          doc.text(`• ${bulletText}`, { indent: 20 });
          isInList = true;
        } else if (line.startsWith("---")) {
          // Horizontal rule
          doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
          doc.moveDown(0.3);
        } else {
          // Regular text
          if (isInList && !line.startsWith("- ")) {
            isInList = false;
          }
          doc.fontSize(10).font("Helvetica").text(line, { align: "justify" });
        }
      }

      doc.end();
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}


