import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  company: z.string().max(100).optional(),
});

// Rate limiting (simple in-memory store - for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";
  return `contact:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later.", errors: {} },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          message: "Validation failed. Please check your input.",
          errors: Object.fromEntries(
            Object.entries(errors).map(([key, value]) => [key, value?.[0] || "Invalid value"])
          ),
        },
        { status: 400 }
      );
    }

    const { name, email, message, company } = validationResult.data;

    // Honeypot check (spam protection)
    if (company && company.trim().length > 0) {
      // If company field is filled, it's likely a bot
      return NextResponse.json(
        { message: "Thank you for your message.", errors: {} },
        { status: 200 }
      );
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { message: "Email service is not configured. Please try again later.", errors: {} },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const recipientEmail = process.env.CONTACT_EMAIL || "hello@nagarajan.dev";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "portfolio@nagarajanr.com";

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent from portfolio contact form</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return NextResponse.json(
        { message: "Failed to send message. Please try again later.", errors: {} },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Thank you for your message. I'll get back to you soon!", errors: {} },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later.", errors: {} },
      { status: 500 }
    );
  }
}

// Cleanup rate limit map periodically (every hour)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60 * 60 * 1000); // Every hour
}

