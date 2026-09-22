import { SITE } from "@/config/site";
import {
  buildAdminNotificationEmail,
  buildConfirmationEmail,
  type ContactEmailPayload,
} from "@/lib/email-templates";

export type { ContactEmailPayload };

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface BrevoRecipient {
  email: string;
  name?: string;
}

interface BrevoEmailPayload {
  sender: { email: string; name: string };
  to: BrevoRecipient[];
  subject: string;
  htmlContent: string;
  textContent: string;
  replyTo?: BrevoRecipient;
}

function getBrevoApiKey(): string | null {
  return process.env.BREVO_API_KEY?.trim() || null;
}

function getSender(): { email: string; name: string } {
  return {
    email: process.env.BREVO_SENDER_EMAIL ?? SITE.email,
    name: process.env.BREVO_SENDER_NAME ?? SITE.name,
  };
}

export function isEmailConfigured(): boolean {
  return getBrevoApiKey() !== null;
}

async function sendBrevoEmail(payload: BrevoEmailPayload): Promise<void> {
  const apiKey = getBrevoApiKey();

  if (!apiKey) {
    throw new Error("BREVO_API_KEY fehlt");
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      const detail = await response.text();
      console.error("[brevo] status:", response.status, detail.slice(0, 200));
    } else {
      console.error("[brevo] status:", response.status);
    }
    throw new Error("E-Mail-Versand fehlgeschlagen");
  }
}

/** Internal inbox – full form details (not shown to customers). */
function getInternalOfficeEmail(): string {
  return process.env.CONTACT_TO_EMAIL ?? "office@sofortentrumpelung.at";
}

/** Customer-facing address – always sofortraumung.at */
function getCustomerFacingEmail(): string {
  return process.env.BREVO_SENDER_EMAIL ?? SITE.email;
}

export async function sendContactEmails(
  payload: ContactEmailPayload,
): Promise<void> {
  const sender = getSender();
  const internalOfficeEmail = getInternalOfficeEmail();
  const customerFacingEmail = getCustomerFacingEmail();

  const adminEmail = buildAdminNotificationEmail(payload);
  const confirmationEmail = buildConfirmationEmail(payload);

  // Detailed inquiry → internal office only
  await sendBrevoEmail({
    sender,
    to: [{ email: internalOfficeEmail, name: SITE.name }],
    replyTo: { email: payload.email, name: payload.name },
    subject: adminEmail.subject,
    textContent: adminEmail.textContent,
    htmlContent: adminEmail.htmlContent,
  });

  // Confirmation → customer; reply-to & branding only sofortraumung.at
  await sendBrevoEmail({
    sender,
    to: [{ email: payload.email, name: payload.name }],
    replyTo: { email: customerFacingEmail, name: SITE.name },
    subject: confirmationEmail.subject,
    textContent: confirmationEmail.textContent,
    htmlContent: confirmationEmail.htmlContent,
  });
}
