"use client";

import { FormEvent, useState } from "react";
import { Check, Send } from "lucide-react";
import LocalImage from "@/components/LocalImage";
import { BENEFITS, REGION_FEATURES, SERVICE_OPTIONS } from "@/lib/data";
import type { ContactFormData, ServiceOptionValue } from "@/types";

const INITIAL_FORM: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
    setIsSubmitting(true);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 600);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData(INITIAL_FORM);
  };

  return (
    <section id="kontakt" className="bg-navy py-16 lg:py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.35fr_0.95fr] lg:gap-6">
        <div id="warum">
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl">
            Warum Soforträumung?
          </h2>
          <ul className="mt-8 space-y-5">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-tight text-white">
                      {benefit.title}
                    </p>
                    <p className="mt-0.5 text-sm text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative min-h-[320px] overflow-hidden bg-slate-800 sm:min-h-[400px] lg:-mx-2 lg:min-h-full">
          <LocalImage
            src="/images/wien-map.webp"
            alt="Einsatzgebiet Wien, Niederösterreich und Umgebung"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            fallbackClassName="bg-slate-800"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/40 to-transparent" />
          <div className="absolute left-0 top-0 z-10 max-w-[95%] p-4 sm:p-5 lg:p-6">
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-white sm:text-2xl lg:text-[1.65rem]">
              Wir sind für Sie da
            </h2>
            <p className="mt-2 text-base text-white/85 sm:text-lg">
              Wien, Niederösterreich & Umgebung
            </p>
            <ul className="mt-5 space-y-2.5">
              {REGION_FEATURES.map((feature) => (
                <li
                  key={feature.id}
                  className="flex items-center gap-2.5 text-base text-white/95 sm:text-lg"
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-lime"
                    aria-hidden="true"
                  />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative rounded-xl bg-navy-light p-5 sm:p-6">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-lime sm:text-xl">
            Kostenlos & unverbindlich anfragen
          </h2>

          {isSubmitted ? (
            <div className="mt-8 rounded-lg border border-lime/40 bg-lime/10 p-5 text-center">
              <p className="text-sm font-bold text-lime">
                Danke! Wir melden uns in Kürze bei Ihnen.
              </p>
              <button
                type="button"
                className="mt-3 text-xs font-semibold text-white/70 underline hover:text-white"
                onClick={() => setIsSubmitted(false)}
              >
                Neue Anfrage senden
              </button>
            </div>
          ) : (
            <form className="mt-5 space-y-3" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="sr-only">
                  Ihr Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ihr Name*"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Telefon*"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="E-Mail*"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-md border-0 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Leistung
                </label>
                <select
                  id="service"
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
                <label htmlFor="message" className="sr-only">
                  Ihre Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Ihre Nachricht (optional)"
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
            </form>
          )}

          <svg
            className="pointer-events-none absolute -right-2 bottom-24 hidden h-16 w-16 text-lime lg:block"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M52 8 C 40 20, 28 28, 18 42"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M14 34 L18 42 L26 38"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
