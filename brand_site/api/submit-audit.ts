import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const NOTIFY_EMAIL = "mominnaeem786@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, company, message, preferredDate, preferredTime } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // 1. Insert into Supabase
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/audit_requests`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: message || null,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
      }),
    });

    if (!supabaseRes.ok) {
      const text = await supabaseRes.text();
      console.error("Supabase insert failed:", text);
      return res.status(500).json({ error: "Failed to save request" });
    }

    // 2. Send email notification via Resend
    const emailHtml = `
      <h2>New Audit Request from ${name}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>` : ""}
        ${company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company}</td></tr>` : ""}
        ${preferredDate ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${preferredDate}</td></tr>` : ""}
        ${preferredTime ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${preferredTime}</td></tr>` : ""}
        ${message ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>` : ""}
      </table>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Thrive Web Co <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New Audit Request: ${name}${company ? ` (${company})` : ""}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const text = await resendRes.text();
      console.error("Resend email failed:", text);
      // Don't fail the request — data is already saved
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Submit audit error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
