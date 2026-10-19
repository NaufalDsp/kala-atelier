import { EnquiryInput } from "@/domain/enquiry";
import { siteConfig } from "@/config/site";

export interface SendEnquiryEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEnquiryNotification(
  enquiry: EnquiryInput,
  enquiryId: string
): Promise<SendEnquiryEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL || siteConfig.contact.email;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "enquiry@kalaatelier.com";

  // Fallback to development logger if Resend API key is not configured
  if (!apiKey) {
    console.info(
      `[DEV EMAIL DISPATCH] Enquiry ID: ${enquiryId}\nFrom: ${enquiry.name} <${enquiry.email}>\nLocation: ${enquiry.location}\nTypes: ${enquiry.projectTypes.join(", ")}`
    );
    return {
      success: true,
      messageId: `dev-mock-${enquiryId}`,
    };
  }

  try {
    const emailBody = `
=============================================
KALA ATELIER — KONSULTASI BARU DITERIMA
=============================================
ID Konsultasi : ${enquiryId}
Nama Klien    : ${enquiry.name}
Email         : ${enquiry.email}
WhatsApp      : ${enquiry.phone || "-"}
Jenis Proyek  : ${enquiry.projectTypes.join(", ")}
Lokasi Lahan  : ${enquiry.location}
Target Waktu  : ${enquiry.timeline || "Belum ditentukan"}
Alokasi Biaya : ${enquiry.budget || "Belum ditentukan"}
Status Vendor : ${enquiry.hasBuilder || "-"}
Catatan Vendor: ${enquiry.builderNote || "-"}
Sumber Info   : ${enquiry.source || "-"}
Ref Proyek    : ${enquiry.refProject || "Langsung"}

Ringkasan Brief:
${enquiry.brief || "(Tidak ada catatan khusus)"}
=============================================
    `.trim();

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: enquiry.email,
        subject: `[Kala Enquiry] ${enquiry.name} — ${enquiry.location}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[RESEND ERROR]", errorData);
      return {
        success: false,
        error: "Failed to dispatch email notification via Resend",
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    console.error("[EMAIL DISPATCH EXCEPTION]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

