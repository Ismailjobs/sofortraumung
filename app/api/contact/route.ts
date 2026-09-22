import { NextResponse } from "next/server";
import { SERVICE_OPTIONS } from "@/lib/data";
import { sendContactEmails, isEmailConfigured } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import {
  INPUT_LIMITS,
  isAllowedServiceValue,
  isHoneypotTriggered,
  isValidEmail,
  isValidPhone,
  isValidRecaptchaToken,
  stripMessageInput,
  stripUnsafeInput,
} from "@/lib/security";
import type { ServiceOptionValue } from "@/types";

const RECAPTCHA_ACTION = "contact";
const ALLOWED_SERVICES = SERVICE_OPTIONS.map((option) => option.value).filter(
  Boolean,
) as string[];

interface ContactRequestBody {
  name?: string;
  phone?: string;
  email?: string;
  service?: ServiceOptionValue;
  message?: string;
  recaptchaToken?: string;
  website?: string;
}

function getServiceLabel(value: string): string {
  const match = SERVICE_OPTIONS.find((option) => option.value === value);
  return match?.label ?? value;
}

export async function POST(request: Request): Promise<NextResponse> {
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 415 });
  }

  const rawBody = await request.text();
  if (rawBody.length > INPUT_LIMITS.requestBodyBytes) {
    return NextResponse.json({ error: "Anfrage zu groß." }, { status: 413 });
  }

  let body: ContactRequestBody;
  try {
    body = JSON.parse(rawBody) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (isHoneypotTriggered(body.website ?? "")) {
    return NextResponse.json({ ok: true });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  const recaptchaToken = stripUnsafeInput(
    body.recaptchaToken ?? "",
    INPUT_LIMITS.recaptchaToken,
  );

  if (!recaptchaToken || !isValidRecaptchaToken(recaptchaToken)) {
    return NextResponse.json(
      { error: "Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen." },
      { status: 400 },
    );
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return NextResponse.json(
      { error: "Formular ist derzeit nicht verfügbar." },
      { status: 503 },
    );
  }

  try {
    const recaptcha = await verifyRecaptchaToken(
      recaptchaToken,
      RECAPTCHA_ACTION,
    );

    if (!recaptcha.passed) {
      return NextResponse.json(
        {
          error:
            "Ihre Anfrage konnte aus Sicherheitsgründen nicht gesendet werden. Bitte versuchen Sie es erneut.",
        },
        { status: 403 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen." },
      { status: 503 },
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Formular ist derzeit nicht verfügbar." },
      { status: 503 },
    );
  }

  const name = stripUnsafeInput(body.name ?? "", INPUT_LIMITS.name);
  const phone = stripUnsafeInput(body.phone ?? "", INPUT_LIMITS.phone);
  const email = stripUnsafeInput(body.email ?? "", INPUT_LIMITS.email);
  const service = body.service ?? "";
  const message = stripMessageInput(body.message ?? "");

  if (!name || !phone || !email || !service || !message) {
    return NextResponse.json(
      { error: "Bitte füllen Sie alle Pflichtfelder aus." },
      { status: 400 },
    );
  }

  if (!isAllowedServiceValue(service, ALLOWED_SERVICES)) {
    return NextResponse.json(
      { error: "Bitte wählen Sie eine gültige Leistung aus." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige Telefonnummer ein." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmails({
      name,
      phone,
      email,
      serviceLabel: getServiceLabel(service),
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
      },
      { status: 500 },
    );
  }
}
