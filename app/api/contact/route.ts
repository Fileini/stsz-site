import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

type MailContent = {
  subject: string;
  text: string;
  html: string;
};

function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value);
}

function isSubmissionType(value: unknown): value is SubmissionType {
  return value === "support" || value === "feedback" || value === "custom-version";
}

async function sendWithResend(
  apiKey: string,
  fromEmail: string,
  recipientEmail: string,
  replyToEmail: string,
  content: MailContent,
) {
  const attempt = async (includeReplyTo: boolean) => {
    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `StorySizer <${fromEmail}>`,
        to: [recipientEmail],
        ...(includeReplyTo ? { reply_to: replyToEmail } : {}),
        subject: content.subject,
        html: content.html,
        text: content.text,
      }),
    });
  };

  let res = await attempt(true);

  if (!res.ok) {
    const firstError = await res.json().catch(() => ({}));
    const firstMessage =
      typeof firstError?.message === "string"
        ? firstError.message
        : typeof firstError?.error === "string"
          ? firstError.error
          : "Failed to send email via Resend.";

    const isPatternError = firstMessage
      .toLowerCase()
      .includes("did not match the expected pattern");

    if (isPatternError) {
      res = await attempt(false);
      if (res.ok) {
        return;
      }

      const retryError = await res.json().catch(() => ({}));
      const retryMessage =
        typeof retryError?.message === "string"
          ? retryError.message
          : typeof retryError?.error === "string"
            ? retryError.error
            : "Failed to send email via Resend.";

      throw new Error(
        `Email service rejected request format. Check RESEND_FROM_EMAIL and SUPPORT_EMAIL. ${retryMessage}`,
      );
    }

    throw new Error(firstMessage);
  }
}

async function sendWithSmtp(
  smtpHost: string,
  smtpPort: number,
  smtpUser: string,
  smtpPass: string,
  fromAddress: string,
  recipientEmail: string,
  replyToEmail: string,
  content: MailContent,
) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: fromAddress,
    to: recipientEmail,
    replyTo: replyToEmail,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
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


    const subjectByType: Record<SubmissionType, string> = {
      support: `StorySizer Support Ticket from ${name}`,
      feedback: `StorySizer Feedback from ${name}`,
      "custom-version": `StorySizer Custom Version Request from ${name}`,
    };

    const labelByType: Record<SubmissionType, string> = {
      support: "Support",
      feedback: "Feedback",
      "custom-version": "Custom Version Request",
    };

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

    const content: MailContent = {
      subject: subjectByType[submissionType],
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Type:</strong> ${escapeHtml(labelByType[submissionType])}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      text: `Type: ${labelByType[submissionType]}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      await sendWithResend(apiKey, fromEmail, recipientEmail, email, content);
    } else {
      const smtpHost = process.env.SMTP_HOST?.trim();
      const smtpPort = Number(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER?.trim();
      const smtpPass = process.env.SMTP_PASS?.trim();
      const smtpFrom = (process.env.MAIL_FROM || smtpUser || fromEmail).trim();

      if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
        return NextResponse.json(
          {
            error:
              "Email service is not configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.",
          },
          { status: 500 },
        );
      }

      await sendWithSmtp(
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass,
        smtpFrom,
        recipientEmail,
        email,
        content,
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
