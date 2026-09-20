import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LinkifiedText from "@/components/LinkifiedText";
import ServicePricingTable from "@/components/service/ServicePricingTable";
import type { ServiceContentBlock } from "@/types/service-content";

interface ServiceContentBlocksProps {
  blocks: ServiceContentBlock[];
}

export default function ServiceContentBlocks({ blocks }: ServiceContentBlocksProps) {
  return (
    <div className="mt-8 min-w-0 space-y-8 border-t border-white/10 pt-8 sm:mt-10 sm:space-y-10 sm:pt-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "section":
            return (
              <section key={`svc-section-${index}`} className="min-w-0">
                <h2 className="text-lg font-extrabold uppercase leading-snug tracking-tight text-lime break-words sm:text-xl">
                  {block.heading}
                </h2>
                <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                  {block.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 48)}
                      className="text-sm leading-relaxed text-white/80 break-words sm:text-base"
                    >
                      <LinkifiedText text={p} />
                    </p>
                  ))}
                </div>
              </section>
            );

          case "pricing":
            return (
              <ServicePricingTable key={`svc-pricing-${index}`} data={block.data} />
            );

          case "steps":
            return (
              <section key={`svc-steps-${index}`} className="min-w-0">
                <h2 className="text-lg font-extrabold uppercase leading-snug tracking-tight text-lime break-words sm:text-xl">
                  {block.title}
                </h2>
                <ol className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                  {block.steps.map((step, si) => (
                    <li
                      key={step}
                      className="flex gap-2.5 rounded-lg border border-white/10 bg-navy-light p-3 text-sm text-white/80 sm:gap-3 sm:p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-extrabold text-navy">
                        {si + 1}
                      </span>
                      <span className="min-w-0 flex-1 leading-relaxed break-words pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            );

          case "caseStudy":
            return (
              <aside
                key={`svc-case-${index}`}
                className="min-w-0 rounded-xl border border-lime/30 bg-lime/5 p-4 sm:p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-tight text-lime">
                  Praxis-Beispiel · {block.data.location}
                </p>
                <h2 className="mt-2 text-base font-extrabold uppercase leading-snug tracking-tight text-white break-words sm:text-lg">
                  {block.data.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75 break-words">
                  {block.data.text}
                </p>
              </aside>
            );

          case "hint":
            return (
              <aside
                key={`svc-hint-${index}`}
                className="min-w-0 rounded-xl border border-white/15 bg-navy-light p-4 sm:p-5"
              >
                <h2 className="text-sm font-extrabold uppercase leading-snug tracking-tight text-lime break-words">
                  {block.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70 break-words">
                  <LinkifiedText text={block.text} />
                </p>
              </aside>
            );

          case "links":
            return (
              <section key={`svc-links-${index}`} className="min-w-0">
                <h2 className="text-base font-extrabold uppercase leading-snug tracking-tight text-white break-words sm:text-lg">
                  {block.title}
                </h2>
                <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:flex-wrap">
                  {block.links.map((link) => (
                    <li key={link.href} className="min-w-0 sm:max-w-full">
                      <Link
                        href={link.href}
                        className="flex w-full items-center justify-between gap-2 rounded-md border border-white/15 bg-navy-light px-3 py-2.5 text-sm font-semibold text-lime transition hover:border-lime/50 sm:inline-flex sm:w-auto sm:justify-start"
                      >
                        <span className="min-w-0 break-words">{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
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
