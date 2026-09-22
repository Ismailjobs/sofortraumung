/** Input sanitization & validation for contact forms (defense in depth). */
const HTML_TAG = /<[^>]*>/g;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Generous limits – block abuse without restricting normal users. */
export const INPUT_LIMITS = {
  name: 200,
  phone: 64,
  email: 320,
  message: 10_000,
  recaptchaToken: 4096,
  requestBodyBytes: 64_000,
} as const;

export function stripUnsafeInput(value: string, maxLength: number): string {
  return value
    .replace(HTML_TAG, "")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, maxLength);
}

/** Message field: sanitize, max 10.000 Zeichen, kein Mindest-Limit. */
export function stripMessageInput(value: string): string {
  return stripUnsafeInput(value, INPUT_LIMITS.message);
}

export function isValidEmail(value: string): boolean {
  if (value.length > INPUT_LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
}

/** Accepts international formats: +43, spaces, dashes, parentheses. */
export function isValidPhone(value: string): boolean {
  if (value.length > INPUT_LIMITS.phone) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 20;
}

export function isValidRecaptchaToken(value: string): boolean {
  return (
    value.length >= 20 &&
    value.length <= INPUT_LIMITS.recaptchaToken &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}

export function isHoneypotTriggered(value: string): boolean {
  return value.trim().length > 0;
}

export function isAllowedServiceValue(
  value: string,
  allowedValues: readonly string[],
): boolean {
  return value.length > 0 && allowedValues.includes(value);
}
