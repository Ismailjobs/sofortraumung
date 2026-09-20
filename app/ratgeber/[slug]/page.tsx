import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { SITE } from "@/config/site";
import {
  getAllRatgeberSlugs,
  getArticleNavigation,
  getRatgeberBySlug,
} from "@/config/ratgeber";
import ArticlePrevNext from "@/components/ratgeber/ArticlePrevNext";
import LinkifiedText from "@/components/LinkifiedText";
import { getServiceBySlug, type ServiceSlug } from "@/config/services";
import ArticleBlocks from "@/components/ratgeber/ArticleBlocks";
import ArticleFaq from "@/components/ratgeber/ArticleFaq";
import JsonLd from "@/components/JsonLd";
import { buildRatgeberArticleSchema } from "@/lib/article-schemas";

function serviceTitleFromPath(path: string): string {
  const slug = path.replace(/^\//, "") as ServiceSlug;
  const service = getServiceBySlug(slug);
  return service?.title ?? path;
}

interface RatgeberArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllRatgeberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RatgeberArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getRatgeberBySlug(slug);

  if (!article) {
    return { title: "Artikel nicht gefunden | SofortRäumung" };
  }

  const canonical = `${SITE.domain}/ratgeber/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonical,
      locale: SITE.locale,
      type: "article",
      siteName: SITE.name,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

export default async function RatgeberArticlePage({
  params,
}: RatgeberArticlePageProps) {
  const { slug } = await params;
  const article = getRatgeberBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonical = `${SITE.domain}/ratgeber/${article.slug}`;
  const schema = buildRatgeberArticleSchema(article, canonical);
  const navigation = getArticleNavigation(slug);

  return (
    <>
      <JsonLd id={`schema-ratgeber-${article.slug}`} data={schema} />
      <main className="bg-navy">
        <section className="border-b border-white/10 bg-navy-light py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Brotkrumen">
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
                  <li>
                    <Link href="/" className="hover:text-lime">
                      Startseite
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/ratgeber" className="hover:text-lime">
                      Ratgeber
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/70">{article.title}</li>
                </ol>
              </nav>
              <p className="mt-5 text-xs font-semibold uppercase tracking-tight text-lime">
                {article.category}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
                {article.h1}
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/60">
                {article.subtitle}
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                {article.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Aktualisiert{" "}
                  {new Date(article.dateModified).toLocaleDateString("de-AT")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  ca. {article.readingMinutes} Min. Lesezeit
                </span>
              </div>
              <Link
                href="/#kontakt"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
              >
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <article className="py-12 lg:py-16">
          <div className="site-container">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4">
                {article.intro.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-relaxed text-white/78"
                  >
                    <LinkifiedText text={paragraph} />
                  </p>
                ))}
              </div>

              <ArticleBlocks blocks={article.blocks} />

              <ArticleFaq items={article.faq} />

              {article.relatedServicePaths.length > 0 ? (
                <aside>
                  <h2 className="text-base font-extrabold uppercase tracking-tight text-white">
                    Passende Leistungen in Wien
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {article.relatedServicePaths.map((path) => (
                      <li key={path}>
                        <Link
                          href={path}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-lime hover:underline"
                        >
                          {serviceTitleFromPath(path)}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}

              <div className="border-t border-white/10 pt-10">
                <h2 className="mb-5 text-lg font-extrabold uppercase tracking-tight text-white">
                  Weiterlesen im Ratgeber
                </h2>
                <ArticlePrevNext
                  previous={navigation.previous}
                  next={navigation.next}
                />
                <Link
                  href="/ratgeber"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-lime"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Alle Ratgeber
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
