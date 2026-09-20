"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/data";
import { LEISTUNG_NAV_ITEMS } from "@/lib/leistungen";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLeistungenOpen, setIsLeistungenOpen] = useState<boolean>(false);
  const [isMobileLeistungenOpen, setIsMobileLeistungenOpen] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = (): void => {
    setIsOpen(false);
    setIsMobileLeistungenOpen(false);
  };

  const closeLeistungen = (): void => {
    setIsLeistungenOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLeistungenOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsLeistungenOpen(false);
        setIsMobileLeistungenOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy">
        <div className="site-container flex h-[4.5rem] items-center justify-between gap-3 sm:h-20 lg:h-[5.25rem]">
        <Link
          href="/"
          className="flex h-full shrink-0 items-center"
          onClick={closeMenu}
          aria-label="SofortRäumung – Zur Startseite"
        >
          <Image
            src="/images/navbar-logo.webp"
            alt="SofortRäumung Wien Logo"
            width={1674}
            height={411}
            className="h-[calc(100%-8px)] w-auto object-contain"
            sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 360px"
            priority
          />
        </Link>

        <nav
          className="hidden items-center xl:flex"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((link, index) => (
            <div key={link.href} className="flex items-center">
              {index > 0 ? (
                <span
                  className="mx-3 h-4 w-px bg-white/20"
                  aria-hidden="true"
                />
              ) : null}
              {link.hasDropdown ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm font-medium text-white/90 transition hover:text-lime"
                    aria-expanded={isLeistungenOpen}
                    aria-haspopup="true"
                    onClick={() => setIsLeistungenOpen((prev) => !prev)}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-70 transition ${
                        isLeistungenOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isLeistungenOpen ? (
                    <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,920px)] -translate-x-1/2 rounded-xl border border-white/10 bg-navy-light p-4 shadow-2xl">
                      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                        <p className="text-xs font-extrabold uppercase tracking-tight text-lime">
                          Unsere Leistungen
                        </p>
                        <Link
                          href="/leistungen"
                          onClick={closeLeistungen}
                          className="text-xs font-semibold text-white/70 transition hover:text-lime"
                        >
                          Alle anzeigen
                        </Link>
                      </div>
                      <div className="grid max-h-[70vh] grid-cols-2 gap-2 overflow-y-auto lg:grid-cols-3">
                        {LEISTUNG_NAV_ITEMS.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.href}
                            onClick={closeLeistungen}
                            className="group rounded-lg p-3 transition hover:bg-white/5"
                          >
                            <p className="text-sm font-bold text-white group-hover:text-lime">
                              {item.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/55">
                              {item.description}
                            </p>
                            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-lime">
                              Mehr erfahren
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/90 transition hover:text-lime"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={PHONE_HREF} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime/15 text-lime">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-white">{PHONE_DISPLAY}</span>
              <span className="text-xs font-semibold text-lime">
                24/7 erreichbar
              </span>
            </span>
          </a>
          <Link
            href="/#kontakt"
            className="rounded-md bg-lime px-4 py-2.5 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
          >
            Kostenlos anfragen
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white xl:hidden"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-navy-light px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium text-white/90 hover:bg-white/5 hover:text-lime"
                    aria-expanded={isMobileLeistungenOpen}
                    onClick={() =>
                      setIsMobileLeistungenOpen((prev) => !prev)
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition ${
                        isMobileLeistungenOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isMobileLeistungenOpen ? (
                    <div className="mb-2 ml-2 max-h-72 space-y-1 overflow-y-auto border-l border-white/10 pl-3">
                      {LEISTUNG_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href}
                          onClick={closeMenu}
                          className="block rounded-md px-2 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-lime"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-lime"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a href={PHONE_HREF} className="flex items-center gap-2.5 px-3">
              <Phone className="h-4 w-4 text-lime" aria-hidden="true" />
              <span>
                <span className="block text-sm font-bold text-white">
                  {PHONE_DISPLAY}
                </span>
                <span className="text-xs font-semibold text-lime">
                  24/7 erreichbar
                </span>
              </span>
            </a>
            <Link
              href="/#kontakt"
              onClick={closeMenu}
              className="rounded-md bg-lime px-4 py-3 text-center text-sm font-extrabold uppercase tracking-tight text-navy"
            >
              Kostenlos anfragen
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
