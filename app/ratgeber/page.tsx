import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SITE } from "@/config/site";
import { RATGEBER_ARTICLES } from "@/config/ratgeber";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Ratgeber Wien – Räumung & Entrümpelung | SofortRäumung",
  description:
    "Ratgeber zu Entrümpelung, Wohnungsauflösung, Verlassenschaft und besenreiner Übergabe in Wien. Praktische Tipps von SofortRäumung.",
  alternates: {
    canonical: `${SITE.domain}/ratgeber`,
  },
  openGraph: {
    title: "Ratgeber Wien – Räumung & Entrümpelung | SofortRäumung",
    description:
      "Tipps und Checklisten rund um Räumung und Entrümpelung in Wien & Niederösterreich.",
    url: `${SITE.domain}/ratgeber`,
    locale: SITE.locale,
    type: "website",
    siteName: SITE.name,
  },
};

export default function RatgeberIndexPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Ratgeber", path: "/ratgeber" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb,
      {
        "@type": "CollectionPage",
        "@id": `${SITE.domain}/ratgeber#collection`,
        name: "Ratgeber Wien – Räumung & Entrümpelung",
        description:
          "Ratgeber und Checklisten zu Räumung, Entrümpelung und Wohnungsauflösung in Wien.",
        url: `${SITE.domain}/ratgeber`,
        isPartOf: { "@id": `${SITE.domain}/#website` },
        about: { "@id": `${SITE.domain}/#localbusiness` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: RATGEBER_ARTICLES.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE.domain}/ratgeber/${article.slug}`,
            name: article.title,
          })),
        },
      },
    ],
  };

  return (
    <>
      <JsonLd id="schema-ratgeber-index" data={collectionSchema} />
      <main className="bg-navy">
        <section className="border-b border-white/10 bg-navy-light py-14 lg:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-tight text-lime">
              Ratgeber
            </p>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ratgeber für Räumung & Entrümpelung in Wien
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Praxisnahe Tipps zu Kosten, Ablauf, Verlassenschaft und
              besenreiner Übergabe – damit Sie in Wien gut vorbereitet sind.
            </p>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16">
          <div className="site-container">
            <div className="grid gap-5 md:grid-cols-2">
              {RATGEBER_ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col rounded-xl border border-white/15 bg-navy-light p-6 transition hover:border-lime/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                    {article.category}
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold uppercase tracking-tight text-white">
                    <Link
                      href={`/ratgeber/${article.slug}`}
                      className="hover:text-lime"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readingMinutes} Min. Lesezeit
                    </span>
                    <Link
                      href={`/ratgeber/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-lime"
                    >
                      Weiterlesen
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
