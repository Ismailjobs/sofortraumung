import type { MetadataRoute } from "next";
import { getAllRatgeberSlugs } from "@/config/ratgeber";
import { getAllServiceSlugs, getServicePath } from "@/config/services";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.domain}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.domain}/ratgeber`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.domain}/referenzen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.domain}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.domain}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${SITE.domain}${getServicePath(slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "raeumung-wien" ? 0.95 : 0.85,
    })
  );

  const ratgeberRoutes: MetadataRoute.Sitemap = getAllRatgeberSlugs().map(
    (slug) => ({
      url: `${SITE.domain}/ratgeber/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...ratgeberRoutes];
}
