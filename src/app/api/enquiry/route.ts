import { NextRequest, NextResponse } from "next/server";
import { enquiryInputSchema } from "@/domain/enquiry";
import { hashIp, checkRateLimit } from "@/lib/rate-limit";
import { sendEnquiryNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & rate limiting check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const cfIp = request.headers.get("cf-connecting-ip");
    const clientIp = (cfIp || forwardedFor || "127.0.0.1").split(",")[0].trim();
    const ipHash = hashIp(clientIp);

    const rateLimit = checkRateLimit(ipHash);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Terlalu banyak permintaan pengiriman formulir. Silakan coba kembali dalam 1 jam.",
        },
        { status: 429 }
      );
    }

    // 2. Body parsing
    const json = await request.json();

    // 3. Honeypot anti-spam check (must be empty)
    if (json.website && json.website.length > 0) {
      // Silently accept bot submission without processing
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    // 4. Server-side Zod validation
    const parseResult = enquiryInputSchema.safeParse(json);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          fieldErrors[path.toString()] = issue.message;
        }
      });

      return NextResponse.json(
        {
          ok: false,
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;

    // 5. Cloudflare Turnstile verification (if configured in production)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && validatedData.turnstileToken) {
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: validatedData.turnstileToken,
              remoteip: clientIp,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return NextResponse.json(
            {
              ok: false,
              errors: { turnstile: "Verifikasi keamanan Turnstile gagal. Silakan coba lagi." },
            },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("[TURNSTILE EXCEPTION]", err);
      }
    }

    // 6. Generate enquiry identifier
    const enquiryId = `ENQ-${Date.now().toString(36).toUpperCase()}`;

    // 7. Dispatch notification email
    await sendEnquiryNotification(validatedData, enquiryId);

    return NextResponse.json(
      {
        ok: true,
        enquiryId,
        message: "Formulir konsultasi Anda berhasil dikirim ke studio Kala Atelier.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/enquiry EXCEPTION]", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Terjadi kesalahan pada sistem saat memproses formulir. Silakan coba kembali.",
      },
      { status: 500 }
    );
  }
}

