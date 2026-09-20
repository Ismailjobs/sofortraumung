/** Client-side input sanitization for contact forms (defense in depth). */
const HTML_TAG = /<[^>]*>/g;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const INPUT_LIMITS = {
  name: 120,
  phone: 40,
  email: 254,
  message: 2000,
} as const;

export function stripUnsafeInput(value: string, maxLength: number): string {
  return value
    .replace(HTML_TAG, "")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= INPUT_LIMITS.email;
}

export function isValidPhone(value: string): boolean {
  const normalized = value.replace(/[\s\-()/+.]/g, "");
  return /^\+?\d{6,15}$/.test(normalized);
}

export function isHoneypotTriggered(value: string): boolean {
  return value.trim().length > 0;
}
