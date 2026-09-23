import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  FOOTER_CONTACT,
  FOOTER_INFO,
  FOOTER_SERVICES,
  SOCIAL_LINKS,
} from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-navy-light">
      <div className="site-container py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="ml-[6%] mr-auto w-[88%] max-w-xs text-left sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none lg:col-span-3">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="SofortRäumung – Zur Startseite"
            >
              <Image
                src="/images/navbar-logo.webp"
                alt="SofortRäumung Wien Logo"
                width={260}
                height={64}
                className="h-11 w-auto object-contain sm:h-12"
                sizes="(max-width: 640px) 220px, 260px"
                loading="lazy"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Ihr Partner für schnelle, diskrete und professionelle Räumungen in
              Wien, Niederösterreich & Umgebung.
            </p>
            <div className="mt-5 flex items-center justify-start gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-lime hover:text-lime"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Leistungen */}
          <div className="ml-[6%] mr-auto w-[88%] max-w-xs text-left sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-tight text-white">
              Leistungen
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informationen */}
          <div className="ml-[6%] mr-auto w-[88%] max-w-xs text-left sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-tight text-white">
              Informationen
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_INFO.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="ml-[6%] mr-auto w-[88%] max-w-xs text-left sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-tight text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_CONTACT.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="inline-flex items-center gap-2.5 text-sm text-white/65 transition hover:text-lime">
                    <Icon className="h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                    {item.label}
                  </span>
                );
                return (
                  <li key={item.id}>
                    {item.href ? <a href={item.href}>{content}</a> : content}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Satisfaction badge */}
          <div className="col-span-1 flex justify-center sm:col-span-2 sm:justify-start lg:col-span-2 lg:justify-end">
            <div className="flex w-full max-w-[180px] flex-col items-center rounded-xl border border-lime/40 bg-navy p-4 text-center lg:items-center lg:text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime/20 text-lime">
                <Star className="h-5 w-5 fill-current" aria-hidden="true" />
              </span>
              <p className="mt-3 text-xs font-extrabold uppercase leading-snug tracking-tight text-lime">
                100% Zufriedenheit garantiert
              </p>
              <div className="mt-2 flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/50 sm:flex-row sm:items-center">
          <div className="ml-[6%] mr-auto flex w-[88%] max-w-xs flex-col gap-2 text-left sm:ml-0 sm:mr-0 sm:w-auto sm:max-w-none">
          <p>© {new Date().getFullYear()} sofortraumung.at – Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-lime">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-lime">
              Datenschutz
            </Link>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
