import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const NOTIFY_EMAIL = "mominnaeem786@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // 1. Save to Supabase
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/checklist_downloads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });

    if (!supabaseRes.ok) {
      const text = await supabaseRes.text();
      console.error("Supabase insert failed:", text);
      return res.status(500).json({ error: "Failed to save" });
    }

    // 2. Notify via Resend
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Thrive Web Co <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `Checklist Download: ${email}`,
        html: `<h2>New Checklist Download</h2><p>Someone downloaded the conversion checklist.</p><table style="border-collapse:collapse;"><tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr></table>`,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Checklist download error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
