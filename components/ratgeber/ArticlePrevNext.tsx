import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { RatgeberArticle } from "@/types/ratgeber";

interface ArticlePrevNextProps {
  previous: RatgeberArticle | null;
  next: RatgeberArticle | null;
}

function NavCard({
  article,
  direction,
}: {
  article: RatgeberArticle;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/ratgeber/${article.slug}`}
      className={`group flex flex-1 flex-col rounded-xl border border-white/15 bg-navy p-5 transition hover:border-lime/40 ${
        isPrev ? "text-left" : "text-right sm:items-end"
      }`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-tight text-lime">
        {isPrev ? (
          <>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Vorheriger Artikel
          </>
        ) : (
          <>
            Nächster Artikel
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
      </span>
      <span className="mt-2 text-xs font-medium text-white/45">{article.category}</span>
      <span
        className={`mt-1 text-sm font-extrabold uppercase tracking-tight text-white group-hover:text-lime ${
          isPrev ? "" : "sm:text-right"
        }`}
      >
        {article.title}
      </span>
      <span
        className={`mt-2 line-clamp-2 text-xs text-white/55 ${
          isPrev ? "" : "sm:text-right"
        }`}
      >
        {article.excerpt}
      </span>
    </Link>
  );
}

export default function ArticlePrevNext({ previous, next }: ArticlePrevNextProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Ratgeber Navigation"
      className="grid gap-4 sm:grid-cols-2"
    >
      {previous ? (
        <NavCard article={previous} direction="prev" />
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
      {next ? (
        <NavCard article={next} direction="next" />
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
    </nav>
  );
}
