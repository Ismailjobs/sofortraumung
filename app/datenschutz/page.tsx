import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Datenschutz | SofortRäumung",
  description:
    "Datenschutzerklärung von SofortRäumung (Mesut Duman e.U.) – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: {
    canonical: `${SITE.domain}/datenschutz`,
  },
};

export default function DatenschutzPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Startseite", path: "/" },
    { name: "Datenschutz", path: "/datenschutz" },
  ]);

  return (
    <>
      <JsonLd id="schema-datenschutz-breadcrumb" data={breadcrumb} />
      <main className="bg-navy py-14 lg:py-20">
        <div className="site-container">
          <article className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-tight text-lime">
            Rechtliches
          </p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-4 text-sm text-white/65">
            Stand: {new Date().toLocaleDateString("de-AT")} – Verantwortlicher
            gemäß Art. 4 Abs. 7 DSGVO
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/80">
            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                1. Verantwortlicher
              </h2>
              <p className="mt-3">
                <strong className="text-white">{SITE.legalName}</strong>
                <br />
                {SITE.name} ({SITE.brandAlt})
                <br />
                {SITE.address.streetAddress}
                <br />
                {SITE.address.postalCode} {SITE.address.addressLocality}, Österreich
                <br />
                GISA-Zahl: {SITE.gisaNumber}
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
                2. Allgemeine Hinweise
              </h2>
              <p className="mt-3">
                Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir
                verarbeiten personenbezogene Daten ausschließlich im Einklang
                mit der EU-Datenschutz-Grundverordnung (DSGVO), dem
                österreichischen Datenschutzgesetz (DSG) und dem
                Telekommunikationsgesetz, soweit anwendbar. Diese Erklärung
                informiert Sie über Art, Umfang und Zweck der Datenverarbeitung
                auf {SITE.domainHost}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                3. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p className="mt-3">
                Beim Besuch unserer Website können technisch notwendige Daten
                (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite,
                Browser-Informationen) in Server-Logfiles verarbeitet werden.
                Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an sicherem Betrieb und
                Missbrauchsabwehr).
              </p>
              <p className="mt-3">
                Wenn Sie unser Kontaktformular nutzen oder uns per Telefon,
                E-Mail oder WhatsApp kontaktieren, verarbeiten wir die von Ihnen
                übermittelten Daten (z. B. Name, Telefonnummer, E-Mail-Adresse,
                Nachrichteninhalt, gewünschte Leistung), um Ihre Anfrage zu
                bearbeiten und ein Angebot zu erstellen. Rechtsgrundlagen sind
                Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie
                Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                4. Zweck der Verarbeitung
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Bearbeitung von Anfragen zu Räumung und Entrümpelung in Wien</li>
                <li>Erstellung von Festpreisangeboten nach Besichtigung</li>
                <li>Vertragsanbahnung und Kundenkommunikation</li>
                <li>Technischer Betrieb und Sicherheit der Website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                5. Weitergabe von Daten
              </h2>
              <p className="mt-3">
                Eine Übermittlung Ihrer Daten an Dritte erfolgt nur, wenn dies
                zur Vertragserfüllung erforderlich ist (z. B. Entsorgungs- oder
                Logistikpartner), Sie eingewilligt haben oder wir gesetzlich
                dazu verpflichtet sind. Eine Weitergabe zu Werbezwecken ohne
                Ihre Einwilligung findet nicht statt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                6. Speicherdauer
              </h2>
              <p className="mt-3">
                Wir speichern personenbezogene Daten nur so lange, wie es für
                die genannten Zwecke erforderlich ist bzw. gesetzliche
                Aufbewahrungspflichten bestehen. Anfragedaten ohne
                Vertragsabschluss werden in der Regel nach Abschluss der
                Kommunikation bzw. nach angemessener Frist gelöscht, sofern
                keine gesetzlichen Gründe entgegenstehen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                7. Cookies und Analyse
              </h2>
              <p className="mt-3">
                Soweit technisch notwendige Cookies eingesetzt werden, erfolgt
                dies auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f
                DSGVO). Für nicht notwendige Cookies bzw. Analyse-Tools holen
                wir – sofern eingesetzt – zuvor Ihre Einwilligung ein (Art. 6
                Abs. 1 lit. a DSGVO). Details zu eingesetzten Tools werden bei
                Implementierung hier ergänzt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                8. Ihre Rechte
              </h2>
              <p className="mt-3">
                Sie haben gegenüber uns insbesondere folgende Rechte:
                Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art.
                17), Einschränkung der Verarbeitung (Art. 18),
                Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21).
                Zudem besteht ein Beschwerderecht bei der österreichischen
                Datenschutzbehörde.
              </p>
              <p className="mt-3">
                Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-lime hover:underline"
                >
                  {SITE.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                9. Datensicherheit
              </h2>
              <p className="mt-3">
                Wir treffen angemessene technische und organisatorische
                Maßnahmen, um Ihre Daten vor Verlust, Manipulation oder
                unbefugtem Zugriff zu schützen. Eine absolute Sicherheit bei
                der Übertragung über das Internet kann jedoch nicht
                gewährleistet werden.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                10. Änderung dieser Erklärung
              </h2>
              <p className="mt-3">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                damit sie stets den aktuellen rechtlichen Anforderungen
                entspricht bzw. Änderungen unserer Leistungen abbildet. Die
                jeweils aktuelle Version finden Sie unter{" "}
                <Link href="/datenschutz" className="text-lime hover:underline">
                  /datenschutz
                </Link>
                .
              </p>
            </section>

            <p className="border-t border-white/10 pt-6 text-xs text-white/50">
              Hinweis: Diese Datenschutzerklärung ist eine allgemeine Vorlage
              und ersetzt keine Rechtsberatung. Lassen Sie den Text bei Bedarf
              von einer Fachperson prüfen.
            </p>

            <p>
              <Link href="/impressum" className="font-semibold text-lime hover:underline">
                Zum Impressum
              </Link>
            </p>
          </div>
          </article>
        </div>
      </main>
    </>
  );
}
