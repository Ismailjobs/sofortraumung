const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let loadPromise: Promise<void> | null = null;

export function isRecaptchaConfigured(): boolean {
  return Boolean(SITE_KEY);
}

export function loadRecaptcha(): Promise<void> {
  if (!SITE_KEY) {
    return Promise.reject(new Error("reCAPTCHA site key fehlt"));
  }

  if (typeof window === "undefined") {
    return Promise.reject(new Error("reCAPTCHA nur im Browser verfügbar"));
  }

  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="recaptcha/api.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("reCAPTCHA konnte nicht geladen werden")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("reCAPTCHA konnte nicht geladen werden"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!SITE_KEY) {
    throw new Error("reCAPTCHA site key fehlt");
  }

  await loadRecaptcha();

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA nicht verfügbar");
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(SITE_KEY, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
