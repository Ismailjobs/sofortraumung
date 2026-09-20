import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { RATGEBER_ARTICLES } from "@/config/ratgeber";

const FEATURED_SLUGS = [
  "entruempelung-kosten-wien",
  "gemeindebau-vollgestellte-wohnung-entruempeln-wien",
  "checkliste-wohnungsaufloesung-wien",
] as const;

export default function RatgeberPreviewSection() {
  const featured = FEATURED_SLUGS.map((slug) =>
    RATGEBER_ARTICLES.find((a) => a.slug === slug)
  ).filter((a): a is NonNullable<typeof a> => a !== undefined);

  return (
    <section className="border-t border-white/10 bg-navy-light py-16 lg:py-20">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-tight text-lime">
              Ratgeber
            </p>
            <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
              Praxiswissen für Räumung in Wien
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Kosten, Checklisten, Gemeindebau und Bezirks-Tipps — von unserem
              Team aus Liesing für alle Wiener Bezirke.
            </p>
          </div>
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:underline"
          >
            Alle Ratgeber
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col rounded-xl border border-white/15 bg-navy p-6 transition hover:border-lime/40"
            >
              <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                {article.category}
              </p>
              <h3 className="mt-2 text-base font-extrabold uppercase tracking-tight text-white">
                <Link
                  href={`/ratgeber/${article.slug}`}
                  className="hover:text-lime"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {article.readingMinutes} Min.
                </span>
                <Link
                  href={`/ratgeber/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-lime"
                >
                  Lesen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
