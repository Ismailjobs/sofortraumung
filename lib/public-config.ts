/** Public config read at runtime (works with Docker / Cloudflare tunnel). */
export function getRecaptchaSiteKey(): string | null {
  const key =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ||
    process.env.RECAPTCHA_SITE_KEY?.trim();

  return key || null;
}

export function isContactFormConfigured(): boolean {
  return (
    Boolean(getRecaptchaSiteKey()) &&
    Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim()) &&
    Boolean(process.env.BREVO_API_KEY?.trim())
  );
}
