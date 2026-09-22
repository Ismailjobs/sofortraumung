const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
}

function getAllowedHostnames(): string[] {
  const fromEnv = process.env.RECAPTCHA_ALLOWED_HOSTNAMES;
  const defaults = ["localhost", "sofortraumung.at", "www.sofortraumung.at"];

  if (!fromEnv?.trim()) {
    return defaults;
  }

  return fromEnv
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

function isHostnameAllowed(hostname: string | undefined): boolean {
  if (!hostname) {
    return process.env.NODE_ENV !== "production";
  }

  const normalized = hostname.toLowerCase();
  const allowed = getAllowedHostnames();

  if (
    allowed.some(
      (entry) => normalized === entry || normalized.endsWith(`.${entry}`),
    )
  ) {
    return true;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn("[recaptcha] unbekannter hostname:", normalized);
    return true;
  }

  console.warn("[recaptcha] hostname nicht erlaubt:", normalized);
  return false;
}

export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string,
): Promise<RecaptchaVerifyResult & { passed: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY fehlt");
  }

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("reCAPTCHA-Verifizierung fehlgeschlagen");
  }

  const data = (await response.json()) as RecaptchaVerifyResult;
  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");

  const passed =
    data.success === true &&
    typeof data.score === "number" &&
    data.score >= minScore &&
    data.action === expectedAction &&
    isHostnameAllowed(data.hostname);

  return { ...data, passed };
}
