import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LinkifiedText from "@/components/LinkifiedText";
import type { ServiceContentBlock } from "@/types/service-content";

interface ServiceContentBlocksProps {
  blocks: ServiceContentBlock[];
}

export default function ServiceContentBlocks({ blocks }: ServiceContentBlocksProps) {
  return (
    <div className="mt-10 space-y-10 border-t border-white/10 pt-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "section":
            return (
              <section key={`svc-section-${index}`}>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-lime">
                  {block.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {block.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 48)}
                      className="text-base leading-relaxed text-white/80"
                    >
                      <LinkifiedText text={p} />
                    </p>
                  ))}
                </div>
              </section>
            );

          case "pricing":
            return (
              <section
                key={`svc-pricing-${index}`}
                className="overflow-hidden rounded-xl border border-white/15"
              >
                <div className="bg-navy-light px-4 py-3 sm:px-5">
                  <h2 className="text-base font-extrabold uppercase tracking-tight text-white sm:text-lg">
                    {block.data.title}
                  </h2>
                  <p className="mt-1 text-xs text-white/55">{block.data.disclaimer}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="border-t border-white/10 bg-navy">
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Leistung
                        </th>
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Richtwert
                        </th>
                        <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5">
                          Enthalten
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.data.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-t border-white/10 bg-navy-light/50"
                        >
                          <td className="px-4 py-3 font-semibold text-white sm:px-5">
                            {row.label}
                          </td>
                          <td className="px-4 py-3 text-lime sm:px-5">{row.abPrice}</td>
                          <td className="px-4 py-3 text-white/75 sm:px-5">{row.includes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );

          case "steps":
            return (
              <section key={`svc-steps-${index}`}>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-lime">
                  {block.title}
                </h2>
                <ol className="mt-4 space-y-3">
                  {block.steps.map((step, si) => (
                    <li
                      key={step}
                      className="flex gap-3 rounded-lg border border-white/10 bg-navy-light p-4 text-sm text-white/80"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-extrabold text-navy">
                        {si + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>
            );

          case "caseStudy":
            return (
              <aside
                key={`svc-case-${index}`}
                className="rounded-xl border border-lime/30 bg-lime/5 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                  Praxis-Beispiel · {block.data.location}
                </p>
                <h2 className="mt-2 text-lg font-extrabold uppercase tracking-tight text-white">
                  {block.data.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {block.data.text}
                </p>
              </aside>
            );

          case "hint":
            return (
              <aside
                key={`svc-hint-${index}`}
                className="rounded-xl border border-white/15 bg-navy-light p-5"
              >
                <h2 className="text-sm font-extrabold uppercase tracking-tight text-lime">
                  {block.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  <LinkifiedText text={block.text} />
                </p>
              </aside>
            );

          case "links":
            return (
              <section key={`svc-links-${index}`}>
                <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                  {block.title}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {block.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-navy-light px-3 py-2 text-sm font-semibold text-lime transition hover:border-lime/50"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
