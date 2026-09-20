import { RATGEBER_ARTICLES } from "@/config/ratgeber";
import { SITE } from "@/config/site";

export function GET(): Response {
  const items = RATGEBER_ARTICLES.map((article) => {
    const url = `${SITE.domain}/ratgeber/${article.slug}`;
    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>
      <category><![CDATA[${article.category}]]></category>
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SofortRäumung Ratgeber Wien</title>
    <link>${SITE.domain}/ratgeber</link>
    <description>Ratgeber zu Räumung, Entrümpelung und Wohnungsauflösung in Wien &amp; Niederösterreich</description>
    <language>${SITE.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.domain}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
