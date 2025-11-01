import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // Read the resume PDF file
    const resumePath = join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await readFile(resumePath);

    // Return PDF with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=nagarajan-ravikumar-resume.pdf",
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Resume not found", { status: 404 });
  }
}

