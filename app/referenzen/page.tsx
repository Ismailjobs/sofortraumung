import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { SITE } from "@/config/site";
import {
  REFERENZEN,
  REFERENZEN_SUMMARY,
} from "@/config/referenzen";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Referenzen Wien – Kundenstimmen | SofortRäumung",
  description:
    "Referenzen und Kundenbewertungen zu Räumung und Entrümpelung in Wien & Umgebung. Echte Erfahrungen mit SofortRäumung.",
  alternates: {
    canonical: `${SITE.domain}/referenzen`,
  },
  openGraph: {
    title: "Referenzen Wien – Kundenstimmen | SofortRäumung",
    description:
      "Kundenstimmen zu Wohnungsauflösung, Entrümpelung und Verlassenschaft in Wien.",
    url: `${SITE.domain}/referenzen`,
    locale: SITE.locale,
    type: "website",
    siteName: SITE.name,
  },
};

export default function ReferenzenPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Referenzen", path: "/referenzen" },
  ]);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb,
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.domain}/#localbusiness`,
        name: SITE.legalNameDisplay,
        url: SITE.domain,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: REFERENZEN_SUMMARY.ratingValue,
          reviewCount: REFERENZEN_SUMMARY.reviewCount,
          bestRating: REFERENZEN_SUMMARY.bestRating,
          worstRating: REFERENZEN_SUMMARY.worstRating,
        },
        review: REFERENZEN.map((item) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: item.name,
          },
          datePublished: item.date,
          reviewBody: item.text,
          name: item.service,
          reviewRating: {
            "@type": "Rating",
            ratingValue: item.rating,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd id="schema-referenzen" data={reviewSchema} />
      <main className="bg-navy">
        <section className="border-b border-white/10 bg-navy-light py-14 lg:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-tight text-lime">
              Referenzen
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Kundenstimmen aus Wien & Umgebung
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Echte Erfahrungen zu Räumung, Entrümpelung, Haushaltsauflösung und
              Verlassenschaft – diskret, termintreu und zum Festpreis.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-navy px-4 py-3">
              <div className="flex text-lime">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-white">
                {REFERENZEN_SUMMARY.ratingValue.toFixed(1).replace(".", ",")}{" "}
                aus {REFERENZEN_SUMMARY.reviewCount}+ Bewertungen
              </p>
            </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16">
          <div className="site-container">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REFERENZEN.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-xl border border-white/15 bg-navy-light p-5"
                >
                  <div className="flex items-center gap-1 text-lime">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <h2 className="mt-3 text-sm font-extrabold uppercase tracking-tight text-white">
                    {item.service}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                    „{item.text}“
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55">
                      <MapPin className="h-3.5 w-3.5 text-lime" aria-hidden="true" />
                      {item.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-lime/30 bg-lime/10 p-6 text-center sm:p-8">
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">
                Auch Sie planen eine Räumung in Wien?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
                Kostenlose Besichtigung, transparenter Festpreis und besenreine
                Übergabe – unverbindlich anfragen.
              </p>
              <Link
                href="/#kontakt"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
              >
                Jetzt anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
