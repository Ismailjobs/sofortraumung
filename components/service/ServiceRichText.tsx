import Link from "next/link";
import type { ContentSegment, ServiceSlug } from "@/config/services";
import { getServicePath } from "@/config/services";

interface RichTextProps {
  segments: ContentSegment[];
  className?: string;
}

export function RichText({ segments, className }: RichTextProps) {
  return (
    <p className={`break-words ${className ?? ""}`}>
      {segments.map((segment, index) => {
        if (segment.type === "internal" && segment.slug) {
          return (
            <Link
              key={`${segment.slug}-${index}`}
              href={getServicePath(segment.slug)}
              className="font-semibold text-lime underline-offset-2 hover:underline"
            >
              {segment.value}
            </Link>
          );
        }
        return <span key={`text-${index}`}>{segment.value}</span>;
      })}
    </p>
  );
}

interface ServiceBreadcrumbProps {
  title: string;
  slug: ServiceSlug;
}

export function ServiceBreadcrumb({ title, slug }: ServiceBreadcrumbProps) {
  return (
    <nav aria-label="Brotkrumen" className="text-xs text-white/60 sm:text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="transition hover:text-lime">
            Startseite
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/leistungen" className="transition hover:text-lime">
            Leistungen
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="max-w-full break-words text-white/90">
          <Link href={getServicePath(slug)} className="hover:text-lime">
            {title}
          </Link>
        </li>
      </ol>
    </nav>
  );
}
