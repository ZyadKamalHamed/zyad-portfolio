import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO ?? "zyad2408@live.com.au";
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const { name, email, business, phone, contact, service, message, company } = body as Record<string, string>;
  if (company) return NextResponse.json({ ok: true }); // honeypot
  if (!name || !email || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const text = `From: ${name} <${email}>\nPhone: ${phone || "-"}\nPreferred contact: ${contact || "Email"}\nBusiness: ${business || "-"}\nNeeds: ${service || "-"}\n\n${message}`;

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] RESEND_API_KEY not set, message logged only:\n" + text);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `Portfolio enquiry from ${name}`, text }),
  });
  if (!res.ok) {
    console.error("[contact] Resend failed", res.status, await res.text());
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
