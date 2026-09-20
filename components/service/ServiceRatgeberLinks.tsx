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
    <aside className="mt-10 rounded-xl border border-white/15 bg-navy-light p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-lime" aria-hidden="true" />
        <h2 className="text-base font-extrabold uppercase tracking-tight text-white">
          Passende Ratgeber-Artikel
        </h2>
      </div>
      <ul className="mt-4 space-y-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/ratgeber/${article.slug}`}
              className="group flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-navy p-4 transition hover:border-lime/40"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                  {article.category}
                </p>
                <p className="mt-1 text-sm font-bold text-white group-hover:text-lime">
                  {article.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-white/55">
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
