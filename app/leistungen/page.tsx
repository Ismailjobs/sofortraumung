import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_LIST, getServicePath } from "@/config/services";
import { SITE } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Leistungen Wien – Räumung & Entrümpelung | SofortRäumung",
  description:
    "Alle Leistungen von SofortRäumung in Wien: Räumung, Entrümpelung, Entsorgung, Haushaltsauflösung, Verlassenschaft und Wertanrechnung.",
  alternates: {
    canonical: `${SITE.domain}/leistungen`,
  },
};

export default function LeistungenIndexPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Leistungen", path: "/leistungen" },
  ]);

  return (
    <>
      <JsonLd id="schema-leistungen-breadcrumb" data={breadcrumb} />
      <main className="bg-navy py-14 lg:py-20">
        <div className="site-container">
          <p className="text-sm font-semibold uppercase tracking-tight text-lime">
            Leistungen
          </p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Unsere Leistungen in Wien
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Von Räumung und Entrümpelung bis Entsorgung, Nachlass und
            Wertanrechnung – diskret, schnell und mit Festpreis in Wien &
            Niederösterreich.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_LIST.map((item) => (
              <Link
                key={item.slug}
                href={getServicePath(item.slug)}
                className="group flex flex-col rounded-xl border border-white/15 bg-navy-light p-5 transition hover:border-lime/50"
              >
                <h2 className="text-base font-extrabold uppercase tracking-tight text-white group-hover:text-lime">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                  {item.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-lime">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
