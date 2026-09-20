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
