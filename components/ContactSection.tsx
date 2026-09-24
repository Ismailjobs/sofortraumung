import Image from "next/image";
import { Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { BENEFITS, REGION_FEATURES } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="kontakt" className="bg-navy py-16 lg:scroll-mt-20 lg:py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[0.95fr_1.35fr_0.95fr] lg:gap-6">
        <div id="warum" className="order-2 lg:order-none">
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

        <div className="relative order-3 min-h-[320px] overflow-hidden bg-slate-800 sm:min-h-[400px] lg:order-none lg:-mx-2 lg:min-h-full">
          <Image
            src="/images/wien-map.webp"
            alt="Einsatzgebiet Wien, Niederösterreich und Umgebung"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            loading="lazy"
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

        <div
          id="kontakt-form"
          className="relative order-1 scroll-mt-[5.25rem] rounded-xl bg-navy-light p-5 sm:scroll-mt-20 sm:p-6"
        >
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-lime sm:text-xl">
            Kostenlos & unverbindlich anfragen
          </h2>
          <ContactForm className="mt-5" />
        </div>
      </div>
    </section>
  );
}
