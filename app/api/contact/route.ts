import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SUPPORT_EMAIL = "francescomaria.falini@gmail.com";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  submissionType?: "support" | "feedback" | "custom-version";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";
    const submissionType = body.submissionType || "support";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in name, email, and message." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailFrom = process.env.MAIL_FROM || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

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

    await transporter.sendMail({
      from: mailFrom,
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: subjectByType[submissionType],
      text: `Type: ${labelByType[submissionType]}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
        email,
      )}</p><p><strong>Type:</strong> ${escapeHtml(
        labelByType[submissionType],
      )}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

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
