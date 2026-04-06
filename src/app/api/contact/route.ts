import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FALLBACK_REPLY_TO = "no-reply@bydiba.dev";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

const sanitizeField = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getClientKey = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip")?.trim() ||
  "";

const isRateLimited = (key: string) => {
  const now = Date.now();
  const recentRequests = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(key, recentRequests);
  return false;
};

export async function POST(req: Request) {
  const clientKey = getClientKey(req);
  const body = await req.json();
  const from = sanitizeField(body?.from);
  const subject = sanitizeField(body?.subject);
  const message = sanitizeField(body?.message);
  const company = sanitizeField(body?.company);

  if (clientKey && isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      },
    );
  }

  if (company) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!from && !subject && !message) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Diba <contact@bydiba.dev>",
      to: "contact@bydiba.dev",
      replyTo: isValidEmail(from) ? from : FALLBACK_REPLY_TO,
      subject: `Portfolio: ${subject || "(no subject)"}`,
      text: `
        From: ${from || "(not provided)"}

        ${message || "(no message)"}
        `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
