import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Impressum | SofortRäumung",
  description:
    "Impressum von SofortRäumung (Mesut Duman e.U.) – Angaben gemäß § 5 ECG, GISA und Kontaktdaten in Wien.",
  alternates: {
    canonical: `${SITE.domain}/impressum`,
  },
};

export default function ImpressumPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Impressum", path: "/impressum" },
  ]);

  return (
    <>
      <JsonLd id="schema-impressum-breadcrumb" data={breadcrumb} />
      <main className="bg-navy py-14 lg:py-20">
        <div className="site-container">
          <article className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-tight text-lime">
            Rechtliches
          </p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Impressum
          </h1>
          <p className="mt-4 text-sm text-white/65">
            Angaben gemäß § 5 E-Commerce-Gesetz (ECG)
          </p>

          <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-white/80">
            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Medieninhaber / Anbieter
              </h2>
              <p className="mt-3">
                <strong className="text-white">{SITE.legalName}</strong>
                <br />
                {SITE.brandAlt} / {SITE.name}
                <br />
                GISA-Zahl: {SITE.gisaNumber}
              </p>
              <p className="mt-3">
                {SITE.address.streetAddress}
                <br />
                {SITE.address.postalCode} {SITE.address.addressLocality}
                <br />
                Österreich
              </p>
              <p className="mt-3">
                Telefon:{" "}
                <a
                  href={`tel:${SITE.telephone}`}
                  className="text-lime hover:underline"
                >
                  {SITE.telephoneDisplay}
                </a>
                <br />
                E-Mail:{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-lime hover:underline"
                >
                  {SITE.email}
                </a>
                <br />
                Web:{" "}
                <a href={SITE.domain} className="text-lime hover:underline">
                  {SITE.domainHost}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Unternehmensgegenstand
              </h2>
              <p className="mt-3">{SITE.companyPurpose}</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Geschäftszeiten
              </h2>
              <p className="mt-3">{SITE.openingHoursText}</p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Aufsichtsbehörde / Gewerbebehörde
              </h2>
              <p className="mt-3">
                Zuständige Behörden richten sich nach dem Sitz des Unternehmens
                in Wien. Gewerbedaten sind im Gewerbeinformationssystem Austria
                (GISA) unter GISA-Zahl {SITE.gisaNumber} einsehbar.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Mitgliedschaft bei der Wirtschaftskammer
              </h2>
              <p className="mt-3">
                Mitglied der Wirtschaftskammer Österreich, Landesstelle Wien
                (WKÖ). Die anwendbare Rechtsordnung ist österreichisches Recht.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Haftung für Inhalte
              </h2>
              <p className="mt-3">
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
                erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                Diensteanbieter sind wir gemäß § 18 Abs. 1 MedienG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Haftung für Links
              </h2>
              <p className="mt-3">
                Unser Angebot enthält ggf. Links zu externen Websites Dritter,
                auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte
                der verlinkten Seiten ist stets der jeweilige Anbieter
                verantwortlich. Zum Zeitpunkt der Verlinkung waren
                rechtswidrige Inhalte nicht erkennbar. Bei Bekanntwerden von
                Rechtsverletzungen werden derartige Links umgehend entfernt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Streitbeilegung / Online-Streitbeilegung
              </h2>
              <p className="mt-3">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Wir sind weder verpflichtet noch grundsätzlich bereit, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                Urheberrecht
              </h2>
              <p className="mt-3">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
                dieser Website unterliegen dem österreichischen Urheberrecht.
                Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <p className="border-t border-white/10 pt-6 text-xs text-white/50">
              Hinweis: Dieses Impressum ist eine allgemeine Vorlage und ersetzt
              keine Rechtsberatung. Ergänzen Sie ggf. UID-Nummer und weitere
              Pflichtangaben nach Vorgabe Ihrer Behörden.
            </p>

            <p>
              <Link href="/datenschutz" className="font-semibold text-lime hover:underline">
                Zur Datenschutzerklärung
              </Link>
            </p>
          </div>
          </article>
        </div>
      </main>
    </>
  );
}
