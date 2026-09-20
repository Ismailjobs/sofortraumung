import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getRatgeberBySlug } from "@/config/ratgeber";

interface ServiceRatgeberLinksProps {
  slugs: string[];
}

export default function ServiceRatgeberLinks({ slugs }: ServiceRatgeberLinksProps) {
  const articles = slugs
    .map((slug) => getRatgeberBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  if (articles.length === 0) return null;

  return (
    <aside className="mt-8 min-w-0 sm:mt-10">
      <div className="flex items-start gap-2 sm:items-center">
        <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-lime sm:mt-0" aria-hidden="true" />
        <h2 className="text-base font-extrabold uppercase leading-snug tracking-tight text-white break-words sm:text-lg">
          Passende Ratgeber-Artikel
        </h2>
      </div>
      <ul className="mt-4 space-y-3">
        {articles.map((article) => (
          <li key={article.slug} className="min-w-0">
            <Link
              href={`/ratgeber/${article.slug}`}
              className="group flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-navy-light/50 p-3 transition hover:border-lime/40 sm:p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                  {article.category}
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-white break-words group-hover:text-lime">
                  {article.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/55">
                  {article.excerpt}
                </p>
              </div>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-lime opacity-70 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/ratgeber"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lime hover:underline"
      >
        Alle Ratgeber ansehen
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </aside>
  );
}
