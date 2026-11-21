import { NextResponse } from "next/server";
import { siteContent } from "@/data/content";

function generateMailto(to: string, name: string, need: string, message: string) {
  const subject = encodeURIComponent(`Project inquiry${need ? `: ${need}` : ""} - ${name || "Portfolio Visitor"}`);
  const body = encodeURIComponent(
    `Hi Daniel,\n\nName: ${name || ""}\nNeed: ${need || ""}\n\n${message || ""}\n`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, need, message, honeypot } = body;

    // 1. Anti-spam honeypot verification (bots fill hidden fields)
    if (honeypot && String(honeypot).trim() !== "") {
      // Quietly return success to avoid tipping off bots
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 2. Validate required inputs
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your email." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please tell me a bit about your project or need." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeKey = process.env.FORMSPREE_KEY;
    const destinationEmail = process.env.CONTACT_EMAIL || siteContent.brand.email || "daniel@upbynature.com";

    // 3. Dispatch to Resend if configured
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>",
            to: [destinationEmail],
            reply_to: email.trim(),
            subject: `Portfolio Inquiry: ${need || "General"} from ${name.trim()}`,
            text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nNeed: ${need || "Not specified"}\n\nMessage:\n${message.trim()}`,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Resend API failed:", res.status, errText);
          return NextResponse.json(
            {
              success: false,
              error: "Failed to dispatch email via Resend service.",
              fallbackMailto: generateMailto(destinationEmail, name, need, message),
            },
            { status: 502 }
          );
        }

        return NextResponse.json({ success: true, message: "Message sent successfully." });
      } catch (err: any) {
        console.error("Resend fetch error:", err);
        return NextResponse.json(
          {
            success: false,
            error: "Network error connecting to Resend service.",
            fallbackMailto: generateMailto(destinationEmail, name, need, message),
          },
          { status: 502 }
        );
      }
    }

    // 4. Dispatch to Formspree if configured
    if (formspreeKey) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            need: need || "Not specified",
            message: message.trim(),
          }),
        });

        if (!res.ok) {
          return NextResponse.json(
            {
              success: false,
              error: "Formspree submission failed.",
              fallbackMailto: generateMailto(destinationEmail, name, need, message),
            },
            { status: 502 }
          );
        }

        return NextResponse.json({ success: true, message: "Message sent successfully." });
      } catch (err: any) {
        console.error("Formspree fetch error:", err);
        return NextResponse.json(
          {
            success: false,
            error: "Network error connecting to Formspree.",
            fallbackMailto: generateMailto(destinationEmail, name, need, message),
          },
          { status: 502 }
        );
      }
    }

    // 5. Friendly fallback when no external API credentials are set in environment variables
    return NextResponse.json(
      {
        success: false,
        missingConfig: true,
        error: "Email delivery API service is not yet configured in environment variables (RESEND_API_KEY or FORMSPREE_KEY).",
        fallbackMailto: generateMailto(destinationEmail, name, need, message),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred.",
        fallbackMailto: generateMailto(siteContent.brand.email, "", "", ""),
      },
      { status: 500 }
    );
  }
}
