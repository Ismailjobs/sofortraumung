import Link from "next/link";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import LinkifiedText from "@/components/LinkifiedText";
import type { RatgeberBlock } from "@/types/ratgeber";

interface ArticleBlocksProps {
  blocks: RatgeberBlock[];
}

export default function ArticleBlocks({ blocks }: ArticleBlocksProps) {
  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "section":
            return (
              <section key={`section-${index}`}>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-lime sm:text-2xl">
                  {block.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {block.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 48)}
                      className="text-base leading-relaxed text-white/78"
                    >
                      <LinkifiedText text={p} />
                    </p>
                  ))}
                </div>
              </section>
            );

          case "table":
            return (
              <section key={`table-${index}`} className="overflow-hidden rounded-xl border border-white/15">
                <div className="bg-navy-light px-4 py-3 sm:px-5">
                  <h2 className="text-base font-extrabold uppercase tracking-tight text-white sm:text-lg">
                    {block.data.title}
                  </h2>
                  {block.data.caption ? (
                    <p className="mt-1 text-xs text-white/55">{block.data.caption}</p>
                  ) : null}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[540px] text-left text-sm">
                    <thead>
                      <tr className="border-t border-white/10 bg-navy">
                        {block.data.headers.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime sm:px-5"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.data.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className="border-t border-white/10 bg-navy-light/50"
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-4 py-3 align-top text-white/75 sm:px-5"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );

          case "checklist":
            return (
              <section
                key={`checklist-${index}`}
                className="rounded-xl border border-white/15 bg-navy-light p-5 sm:p-6"
              >
                <h2 className="text-lg font-extrabold uppercase tracking-tight text-white">
                  {block.data.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {block.data.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );

          case "caseStudy":
            return (
              <aside
                key={`case-${index}`}
                className="rounded-xl border border-lime/30 bg-lime/5 p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                  Praxis-Beispiel · {block.data.location}
                </p>
                <h2 className="mt-2 text-lg font-extrabold uppercase tracking-tight text-white">
                  {block.data.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">
                  <p>
                    <strong className="text-white">Ausgangslage:</strong>{" "}
                    {block.data.situation}
                  </p>
                  <p>
                    <strong className="text-white">Vorgehen:</strong>{" "}
                    {block.data.approach}
                  </p>
                  <p>
                    <strong className="text-white">Ergebnis:</strong>{" "}
                    {block.data.result}
                  </p>
                </div>
              </aside>
            );

          case "cta":
            return (
              <aside
                key={`cta-${index}`}
                className="rounded-xl border border-lime/40 bg-lime/10 p-6 text-center sm:p-8"
              >
                <h2 className="text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl">
                  {block.data.title}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                  {block.data.description}
                </p>
                <Link
                  href={block.data.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
                >
                  {block.data.buttonLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>
            );

          case "steps":
            return (
              <section key={`steps-${index}`}>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-lime">
                  {block.data.title}
                </h2>
                <ol className="mt-4 space-y-3">
                  {block.data.steps.map((step, si) => (
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

          case "hint":
            return (
              <aside
                key={`hint-${index}`}
                className="flex gap-3 rounded-xl border border-white/15 bg-navy-light p-5"
              >
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-tight text-white">
                    {block.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{block.text}</p>
                </div>
              </aside>
            );

          case "links":
            return (
              <section key={`links-${index}`}>
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
