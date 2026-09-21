import type { ServiceSlug } from "@/config/services";

export interface ServiceCoverImage {
  src: string;
  alt: string;
  /** CSS object-position for cover crop */
  objectPosition?: string;
  /** Zoom for homepage service cards */
  scale?: number;
  /** Zoom for service page hero background */
  heroScale?: number;
  /** Hero background opacity (0–1) */
  heroOpacity?: number;
}

export const SERVICE_COVER_IMAGES: Partial<
  Record<ServiceSlug, ServiceCoverImage>
> = {
  "wohnungsaufloesung-wien": {
    src: "/images/Wohnungsauflösung.webp",
    alt: "Professionelle Wohnungsauflösung in Wien durch SofortRäumung",
    objectPosition: "center 45%",
    scale: 1.08,
    heroScale: 1.18,
    heroOpacity: 0.24,
  },
  "verlassenschaften-nachlassraeumung": {
    src: "/images/Verlassenschaft.webp",
    alt: "Diskrete Verlassenschaftsräumung in Wien – Antiquitäten sorgfältig verpackt",
    objectPosition: "42% 35%",
    scale: 1.06,
    heroScale: 1.14,
    heroOpacity: 0.22,
  },
  "firmen-bueroaufloesung-wien": {
    src: "/images/Büroauflösung-Wien.webp",
    alt: "Firmen- und Büroauflösung in Wien durch SofortRäumung",
    objectPosition: "center 40%",
    scale: 1.1,
    heroScale: 1.2,
    heroOpacity: 0.23,
  },
  "kellerraeumung-wien": {
    src: "/images/kellerraumung.webp",
    alt: "Kellerräumung und Entrümpelung in Wien",
    objectPosition: "center center",
    scale: 1.12,
    heroScale: 1.22,
    heroOpacity: 0.25,
  },
  "messie-entruempelung-wien": {
    src: "/images/Messie-Entrümpelung.webp",
    alt: "Messie-Entrümpelung in Wien – diskret und professionell",
    objectPosition: "center 42%",
    scale: 1.08,
    heroScale: 1.16,
    heroOpacity: 0.22,
  },
};

export function getServiceCoverImage(
  slug: string,
): ServiceCoverImage | undefined {
  return SERVICE_COVER_IMAGES[slug as ServiceSlug];
}

export function getServiceCoverImageByHref(
  href: string,
): ServiceCoverImage | undefined {
  const slug = href.replace(/^\//, "");
  return getServiceCoverImage(slug);
}
