"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const MOBILE_QUERY = "(max-width: 1023px)";
const KONTAKT_HASH = "#kontakt";

function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
}

function isKontaktHref(href: string | null): boolean {
  if (!href) return false;
  return href === KONTAKT_HASH || href === "/#kontakt" || href.endsWith("#kontakt");
}

export function scrollToKontaktForm(): void {
  const form = document.getElementById("kontakt-form");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const section = document.getElementById("kontakt");
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface ContactSheetProviderProps {
  children: ReactNode;
}

export default function ContactSheetProvider({
  children,
}: ContactSheetProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash !== KONTAKT_HASH) return;

    const timer = window.setTimeout(() => {
      if (isMobileViewport()) {
        scrollToKontaktForm();
      }
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = (): void => {
      if (window.location.hash === KONTAKT_HASH && isMobileViewport()) {
        scrollToKontaktForm();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!isMobileViewport()) return;

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!isKontaktHref(href)) return;

      if (href === "/#kontakt" && pathname !== "/") {
        return;
      }

      event.preventDefault();

      if (window.location.hash !== KONTAKT_HASH) {
        window.history.pushState(null, "", KONTAKT_HASH);
      }

      scrollToKontaktForm();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return children;
}
