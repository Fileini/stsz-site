import { NextResponse } from "next/server";

export const runtime = "edge";

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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `StorySizer <onboarding@resend.dev>`,
        to: [SUPPORT_EMAIL],
        reply_to: email,
        subject: subjectByType[submissionType],
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Type:</strong> ${escapeHtml(labelByType[submissionType])}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
        text: `Type: ${labelByType[submissionType]}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: error?.message || "Failed to send email via Resend." },
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
