let cachedSiteKey: string | null | undefined;
let configFetchPromise: Promise<string | null> | null = null;
let loadPromise: Promise<void> | null = null;

async function fetchSiteKey(): Promise<string | null> {
  if (cachedSiteKey !== undefined) {
    return cachedSiteKey;
  }

  if (configFetchPromise) {
    return configFetchPromise;
  }

  configFetchPromise = fetch("/api/public-config", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }
      const data = (await response.json()) as {
        recaptchaSiteKey?: string | null;
      };
      cachedSiteKey = data.recaptchaSiteKey?.trim() || null;
      return cachedSiteKey;
    })
    .catch(() => {
      cachedSiteKey = null;
      return null;
    })
    .finally(() => {
      configFetchPromise = null;
    });

  return configFetchPromise;
}

export async function isRecaptchaConfigured(): Promise<boolean> {
  const key = await fetchSiteKey();
  return Boolean(key);
}

export async function loadRecaptcha(): Promise<void> {
  const siteKey = await fetchSiteKey();

  if (!siteKey) {
    throw new Error("reCAPTCHA site key fehlt");
  }

  if (typeof window === "undefined") {
    throw new Error("reCAPTCHA nur im Browser verfügbar");
  }

  if (window.grecaptcha) {
    return;
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
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
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
  const siteKey = await fetchSiteKey();

  if (!siteKey) {
    throw new Error("reCAPTCHA site key fehlt");
  }

  await loadRecaptcha();

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA nicht verfügbar");
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
