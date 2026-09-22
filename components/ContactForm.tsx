"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Check, Send } from "lucide-react";
import { SERVICE_OPTIONS } from "@/lib/data";
import {
  getRecaptchaToken,
  isRecaptchaConfigured,
  loadRecaptcha,
} from "@/lib/recaptcha-client";
import {
  INPUT_LIMITS,
  isHoneypotTriggered,
  isValidEmail,
  isValidPhone,
  stripMessageInput,
  stripUnsafeInput,
} from "@/lib/security";
import type { ContactFormData, ServiceOptionValue } from "@/types";

const INITIAL_FORM: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

interface ContactFormProps {
  idPrefix?: string;
  onSuccess?: () => void;
  className?: string;
}

export default function ContactForm({
  idPrefix = "",
  onSuccess,
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  useEffect(() => {
    if (isRecaptchaConfigured()) {
      loadRecaptcha().catch(() => {
        /* Fehler wird beim Absenden behandelt */
      });
    }
  }, []);

  const fieldId = (name: string): string => `${idPrefix}${name}`;

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "service" ? (value as ServiceOptionValue) : value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setFormError("");

    if (isHoneypotTriggered(honeypot)) {
      setIsSubmitted(true);
      onSuccess?.();
      return;
    }

    const sanitized: ContactFormData = {
      name: stripUnsafeInput(formData.name, INPUT_LIMITS.name),
      phone: stripUnsafeInput(formData.phone, INPUT_LIMITS.phone),
      email: stripUnsafeInput(formData.email, INPUT_LIMITS.email),
      service: formData.service,
      message: stripMessageInput(formData.message),
    };

    if (!sanitized.name || !sanitized.phone || !sanitized.email || !sanitized.message) {
      setFormError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!isValidEmail(sanitized.email)) {
      setFormError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!isValidPhone(sanitized.phone)) {
      setFormError("Bitte geben Sie eine gültige Telefonnummer ein.");
      return;
    }

    if (!sanitized.service) {
      setFormError("Bitte wählen Sie eine Leistung aus.");
      return;
    }

    if (!isRecaptchaConfigured()) {
      setFormError(
        "Das Kontaktformular ist derzeit nicht konfiguriert. Bitte rufen Sie uns an.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken("contact");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sanitized,
          recaptchaToken,
          website: honeypot,
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setFormError(
          result.error ??
            "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        );
        return;
      }

      setIsSubmitted(true);
      setFormData(INITIAL_FORM);
      setHoneypot("");
      onSuccess?.();
    } catch {
      setFormError(
        "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`rounded-lg border border-lime/40 bg-lime/10 p-5 text-center ${className}`}>
        <p className="text-sm font-bold text-lime">
          Vielen Dank! Ihre Anfrage wurde erhalten — wir melden uns in Kürze bei
          Ihnen. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
        </p>
        <button
          type="button"
          className="mt-3 text-xs font-semibold text-white/70 underline hover:text-white"
          onClick={() => setIsSubmitted(false)}
        >
          Neue Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form
      className={`space-y-3 ${className}`}
      onSubmit={handleSubmit}
      noValidate
      id={idPrefix ? `${idPrefix}form` : "kontakt-form"}
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {formError ? (
        <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {formError}
        </p>
      ) : null}

      <div>
        <label htmlFor={fieldId("name")} className="sr-only">
          Ihr Name
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          maxLength={INPUT_LIMITS.name}
          autoComplete="name"
          placeholder="Ihr Name*"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("phone")} className="sr-only">
            Telefon
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            required
            maxLength={INPUT_LIMITS.phone}
            autoComplete="tel"
            placeholder="Telefon*"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
          />
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="sr-only">
            E-Mail
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            maxLength={INPUT_LIMITS.email}
            autoComplete="email"
            placeholder="E-Mail*"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
          />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("service")} className="sr-only">
          Leistung
        </label>
        <select
          id={fieldId("service")}
          name="service"
          required
          value={formData.service}
          onChange={(e) => handleChange("service", e.target.value)}
          className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-lime"
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value || "empty"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={fieldId("message")} className="sr-only">
          Ihre Nachricht
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          required
          maxLength={INPUT_LIMITS.message}
          placeholder="Ihre Nachricht*"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full resize-y rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3.5 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark disabled:opacity-70"
      >
        {isSubmitting ? "Wird gesendet…" : "Jetzt anfragen"}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-white/60">
        <Check className="h-3.5 w-3.5 text-lime" aria-hidden="true" />
        100% kostenlos & unverbindlich
      </p>

      <p className="text-center text-[10px] leading-relaxed text-white/45">
        Diese Website ist durch reCAPTCHA geschützt. Es gelten die{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/70"
        >
          Datenschutzbestimmungen
        </a>{" "}
        und{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/70"
        >
          Nutzungsbedingungen
        </a>{" "}
        von Google. Details in unserer{" "}
        <Link href="/datenschutz" className="underline hover:text-white/70">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
