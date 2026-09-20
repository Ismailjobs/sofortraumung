/**
 * Compatibility layer – canonical source is config/services.ts
 */
export {
  SERVICE_LIST as LEISTUNGEN,
  getServiceBySlug as getLeistungBySlug,
  getAllServiceSlugs as getAllLeistungSlugs,
  getServicePath,
  type ServicePageConfig as LeistungItem,
} from "@/config/services";

import { SERVICE_LIST, getServicePath } from "@/config/services";

/** Nav/dropdown shape used by Navbar */
export interface LeistungNavItem {
  slug: string;
  title: string;
  description: string;
  href: string;
}

export const LEISTUNG_NAV_ITEMS: LeistungNavItem[] = SERVICE_LIST.map(
  (item) => ({
    slug: item.slug,
    title: item.title,
    description: item.shortDescription,
    href: getServicePath(item.slug),
  })
);
