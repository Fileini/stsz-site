import { NextResponse } from "next/server";

export const runtime = "edge";

const SUPPORT_EMAIL = "francescomaria.falini@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  submissionType?: "support" | "feedback" | "custom-version";
};

type SubmissionType = "support" | "feedback" | "custom-version";

function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value);
}

function isSubmissionType(value: unknown): value is SubmissionType {
  return value === "support" || value === "feedback" || value === "custom-version";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const message = body.message?.trim() || "";
    const submissionType = isSubmissionType(body.submissionType)
      ? body.submissionType
      : "support";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in name, email, and message." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }


    const subjectByType = {
      support: `StorySizer Support Ticket from ${name}`,
      feedback: `StorySizer Feedback from ${name}`,
      "custom-version": `StorySizer Custom Version Request from ${name}`,
    };

    const labelByType = {
      support: "Support",
      feedback: "Feedback",
      "custom-version": "Custom Version Request",
    };

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Resend API key not configured." },
        { status: 500 },
      );
    }

    const recipientEmail = (process.env.SUPPORT_EMAIL || SUPPORT_EMAIL).trim().toLowerCase();
    const fromEmail = (process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL)
      .trim()
      .toLowerCase();

    if (!isValidEmail(recipientEmail)) {
      return NextResponse.json(
        { error: "Support email is not configured correctly." },
        { status: 500 },
      );
    }

    if (!isValidEmail(fromEmail)) {
      return NextResponse.json(
        { error: "Sender email is not configured correctly." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `StorySizer <${fromEmail}>`,
        to: [recipientEmail],
        reply_to: email,
        subject: subjectByType[submissionType],
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Type:</strong> ${escapeHtml(labelByType[submissionType])}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
        text: `Type: ${labelByType[submissionType]}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      const responseMessage =
        typeof error?.message === "string"
          ? error.message
          : typeof error?.error === "string"
            ? error.error
            : "Failed to send email via Resend.";

      const isPatternError = responseMessage
        .toLowerCase()
        .includes("did not match the expected pattern");

      return NextResponse.json(
        {
          error: isPatternError
            ? "Email service rejected the request format. Check RESEND_FROM_EMAIL and SUPPORT_EMAIL configuration."
            : responseMessage,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send ticket. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
