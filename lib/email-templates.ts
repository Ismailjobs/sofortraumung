import { SITE } from "@/config/site";

export interface ContactEmailPayload {
  name: string;
  phone: string;
  email: string;
  serviceLabel: string;
  message: string;
}

const BRAND = {
  navy: "#061325",
  lime: "#c8f026",
  text: "#334155",
  muted: "#64748b",
  border: "#e2e8f0",
  white: "#ffffff",
} as const;

const PHONE_ICON = `<span style="display:inline-block;vertical-align:middle;margin-right:8px;font-size:16px;line-height:1;" aria-hidden="true">&#128222;</span>`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function emailShell(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:${BRAND.white};border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
          <tr>
            <td style="background-color:${BRAND.navy};padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:0.02em;color:${BRAND.white};">
                Sofort<span style="color:${BRAND.lime};">Räumung</span>
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:0.04em;text-transform:uppercase;">
                Wien &amp; Niederösterreich
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid ${BRAND.border};">
              <p style="margin:0;font-size:11px;line-height:1.6;color:${BRAND.muted};text-align:center;">
                ${escapeHtml(SITE.legalName)} · ${escapeHtml(SITE.address.streetAddress)}, ${escapeHtml(SITE.address.postalCode)} ${escapeHtml(SITE.address.addressLocality)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function summaryRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.muted};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.text};font-weight:600;vertical-align:top;">${formatMultiline(value)}</td>
    </tr>`;
}

/** Customer: minimal info — category only, no form details. */
export function buildConfirmationEmail(payload: ContactEmailPayload): {
  subject: string;
  htmlContent: string;
  textContent: string;
} {
  const subject = "Ihre Anfrage wurde erhalten – SofortRäumung Wien";

  const textContent = [
    `Guten Tag ${payload.name},`,
    "",
    "vielen Dank für Ihre Anfrage bei SofortRäumung.",
    "Wir haben Ihre Nachricht erhalten.",
    "",
    `Betreff Ihrer Anfrage: ${payload.serviceLabel}`,
    "",
    "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    "",
    "Bei dringenden Anliegen erreichen Sie uns unter:",
    `Telefon: ${SITE.telephoneDisplay}`,
    `E-Mail: ${SITE.email}`,
    "",
    "Mit freundlichen Grüßen",
    "Ihr Team von SofortRäumung",
    SITE.domain,
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${BRAND.text};">
      Guten Tag <strong>${escapeHtml(payload.name)}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${BRAND.text};">
      vielen Dank für Ihr Vertrauen und Ihre Anfrage bei <strong>SofortRäumung</strong>.
      Wir haben Ihre Nachricht erhalten und melden uns <strong>innerhalb von 24 Stunden</strong> bei Ihnen.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;background-color:#f8fafc;border-radius:8px;border:1px solid ${BRAND.border};">
      <tr>
        <td style="padding:20px;text-align:center;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.muted};">
            Ihre Anfrage
          </p>
          <p style="margin:0;font-size:17px;font-weight:800;color:${BRAND.navy};">
            ${escapeHtml(payload.serviceLabel)}
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${BRAND.text};">
      Bei dringenden Anliegen erreichen Sie uns jederzeit telefonisch:
    </p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
      <tr>
        <td style="padding-bottom:10px;">
          <a href="tel:${SITE.telephone}" style="display:inline-block;background-color:${BRAND.lime};color:${BRAND.navy};font-size:15px;font-weight:800;text-decoration:none;padding:14px 24px;border-radius:8px;">
            ${PHONE_ICON}${escapeHtml(SITE.telephoneDisplay)}
          </a>
        </td>
      </tr>
      <tr>
        <td>
          <a href="mailto:${SITE.email}" style="font-size:14px;font-weight:600;color:${BRAND.navy};text-decoration:none;">
            ${escapeHtml(SITE.email)}
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.text};">
      Mit freundlichen Grüßen<br>
      <strong>Ihr Team von SofortRäumung</strong><br>
      <a href="${SITE.domain}" style="color:${BRAND.navy};font-size:13px;">${SITE.domainHost}</a>
    </p>
  `;

  return {
    subject,
    htmlContent: emailShell(subject, bodyHtml),
    textContent,
  };
}

/** Office: full form details for new inquiry. */
export function buildAdminNotificationEmail(payload: ContactEmailPayload): {
  subject: string;
  htmlContent: string;
  textContent: string;
} {
  const subject = `Neue Anfrage: ${payload.serviceLabel} – ${payload.name}`;

  const textContent = [
    "NEUE ANFRAGE – sofortraumung.at",
    "",
    `Name: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-Mail: ${payload.email}`,
    `Leistung: ${payload.serviceLabel}`,
    "",
    "Nachricht des Kunden:",
    payload.message,
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${BRAND.lime};background-color:${BRAND.navy};display:inline-block;padding:6px 12px;border-radius:4px;">
      Neue Anfrage
    </p>
    <p style="margin:16px 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.muted};">
      Kontaktdaten
    </p>
    <p style="margin:0 0 20px;font-size:20px;font-weight:800;color:${BRAND.navy};">
      ${escapeHtml(payload.name)}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
      ${summaryRow("Telefon", payload.phone)}
      ${summaryRow("E-Mail", payload.email)}
      ${summaryRow("Leistung", payload.serviceLabel)}
    </table>
    <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${BRAND.muted};">
      Nachricht des Kunden
    </p>
    <div style="background-color:#f8fafc;border:1px solid ${BRAND.border};border-radius:8px;padding:16px 20px;font-size:14px;line-height:1.7;color:${BRAND.text};">
      ${formatMultiline(payload.message)}
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:${BRAND.muted};">
      Direkt antworten: <a href="mailto:${escapeHtml(payload.email)}" style="color:${BRAND.navy};font-weight:600;">${escapeHtml(payload.email)}</a>
      &nbsp;·&nbsp;
      <a href="tel:${escapeHtml(payload.phone.replace(/\s/g, ""))}" style="color:${BRAND.navy};font-weight:600;">${escapeHtml(payload.phone)}</a>
    </p>
  `;

  return {
    subject,
    htmlContent: emailShell(subject, bodyHtml),
    textContent,
  };
}
