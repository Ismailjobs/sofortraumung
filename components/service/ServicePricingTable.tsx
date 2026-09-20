import type { ServicePricingTable as ServicePricingTableType } from "@/types/service-content";

interface ServicePricingTableProps {
  data: ServicePricingTableType;
}

export default function ServicePricingTable({ data }: ServicePricingTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-white/15">
      <div className="bg-navy-light px-3 py-3 sm:px-5 sm:py-4">
        <h2 className="text-sm font-extrabold uppercase leading-snug tracking-tight text-white sm:text-lg">
          {data.title}
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-white/55">
          {data.disclaimer}
        </p>
      </div>

      {/* Mobile: stacked cards — no horizontal scroll */}
      <ul className="divide-y divide-white/10 sm:hidden">
        {data.rows.map((row) => (
          <li key={row.label} className="space-y-2 bg-navy-light/40 p-4">
            <p className="text-sm font-semibold leading-snug text-white break-words">
              {row.label}
            </p>
            <p className="text-base font-extrabold text-lime">{row.abPrice}</p>
            <p className="text-xs leading-relaxed text-white/70 break-words">
              {row.includes}
            </p>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-t border-white/10 bg-navy">
              <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime lg:px-5">
                Leistung
              </th>
              <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime lg:px-5">
                Richtwert
              </th>
              <th className="px-4 py-3 font-extrabold uppercase tracking-tight text-lime lg:px-5">
                Enthalten
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-white/10 bg-navy-light/50"
              >
                <td className="px-4 py-3 font-semibold text-white lg:px-5">
                  {row.label}
                </td>
                <td className="px-4 py-3 text-lime lg:px-5">{row.abPrice}</td>
                <td className="px-4 py-3 text-white/75 lg:px-5">{row.includes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
