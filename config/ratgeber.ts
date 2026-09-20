import { besenreineUebergabeWienerWohnen } from "@/content/ratgeber/besenreine-uebergabe-wiener-wohnen";
import { checklisteWohnungsaufloesungWien } from "@/content/ratgeber/checkliste-wohnungsaufloesung-wien";
import { entruempelungKostenWien } from "@/content/ratgeber/entruempelung-kosten-wien";
import { entruempelungNeubau1070 } from "@/content/ratgeber/entruempelung-neubau-1070";
import { gemeindebauVollgestellteWohnung } from "@/content/ratgeber/gemeindebau-vollgestellte-wohnung-entruempeln-wien";
import { verlassenschaftRaeumenWien } from "@/content/ratgeber/verlassenschaft-raeumen-wien";
import type { RatgeberArticle } from "@/types/ratgeber";

export type { RatgeberArticle } from "@/types/ratgeber";

export const RATGEBER_ARTICLES: RatgeberArticle[] = [
  entruempelungKostenWien,
  checklisteWohnungsaufloesungWien,
  verlassenschaftRaeumenWien,
  besenreineUebergabeWienerWohnen,
  gemeindebauVollgestellteWohnung,
  entruempelungNeubau1070,
];

export function getRatgeberBySlug(slug: string): RatgeberArticle | undefined {
  return RATGEBER_ARTICLES.find((article) => article.slug === slug);
}

export function getAllRatgeberSlugs(): string[] {
  return RATGEBER_ARTICLES.map((article) => article.slug);
}

export function getRelatedArticles(slug: string, limit = 3): RatgeberArticle[] {
  const current = getRatgeberBySlug(slug);
  if (!current) return RATGEBER_ARTICLES.slice(0, limit);

  const related = current.relatedArticleSlugs
    .map((s) => getRatgeberBySlug(s))
    .filter((a): a is RatgeberArticle => a !== undefined);

  if (related.length >= limit) return related.slice(0, limit);

  const rest = RATGEBER_ARTICLES.filter(
    (a) => a.slug !== slug && !related.some((r) => r.slug === a.slug)
  );
  return [...related, ...rest].slice(0, limit);
}

/** Prev/next navigation: thematic links when defined, else sequential order. */
export function getArticleNavigation(slug: string): {
  previous: RatgeberArticle | null;
  next: RatgeberArticle | null;
} {
  const index = RATGEBER_ARTICLES.findIndex((a) => a.slug === slug);
  const current = RATGEBER_ARTICLES[index];
  if (!current || index === -1) {
    return { previous: null, next: null };
  }

  const sequentialPrev = index > 0 ? RATGEBER_ARTICLES[index - 1] : null;
  const sequentialNext =
    index < RATGEBER_ARTICLES.length - 1
      ? RATGEBER_ARTICLES[index + 1]
      : null;

  const thematicNext =
    getRatgeberBySlug(current.relatedArticleSlugs[0] ?? "") ?? null;

  const thematicPrev =
    RATGEBER_ARTICLES.find((a) => a.relatedArticleSlugs[0] === slug) ?? null;

  return {
    previous: thematicPrev ?? sequentialPrev,
    next: thematicNext ?? sequentialNext,
  };
}
