import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const pdfPath = join(process.cwd(), "public", "resume.pdf");

    // Check if PDF exists
    if (!existsSync(pdfPath)) {
      console.error("Resume PDF not found at:", pdfPath);
      return new NextResponse(
        "Resume PDF not found. Please ensure resume.pdf exists in the public folder.",
        { status: 404 }
      );
    }

    // Read and serve the PDF
    const pdfBuffer = readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Nagarajan_Ravikumar_Resume.pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving resume PDF:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new NextResponse(`Error serving resume PDF: ${errorMessage}`, { status: 500 });
  }
}

