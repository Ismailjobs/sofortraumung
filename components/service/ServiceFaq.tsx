"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import LinkifiedText from "@/components/LinkifiedText";
import type { ServiceFaqItem } from "@/types/service-content";

interface ServiceFaqProps {
  items: ServiceFaqItem[];
  title?: string;
}

export default function ServiceFaq({
  items,
  title = "Häufige Fragen zu dieser Leistung",
}: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-8 min-w-0 sm:mt-10">
      <h2 className="text-lg font-extrabold uppercase leading-snug tracking-tight text-white break-words sm:text-xl">
        {title}
      </h2>
      <div className="mt-4 space-y-2 sm:mt-5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden border-b border-white/10"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 py-3.5 text-left sm:items-center sm:gap-4"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-white break-words sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-lime transition sm:mt-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? (
                <div className="pb-4 pt-0">
                  <p className="text-sm leading-relaxed text-white/72 break-words">
                    <LinkifiedText text={item.answer} />
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
