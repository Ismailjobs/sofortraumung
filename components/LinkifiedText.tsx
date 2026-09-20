import type { ReactNode } from "react";
import Link from "next/link";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const ALLOWED_PATH = /^(\/|https:\/\/sofortraumung\.at\/)/;

interface LinkifiedTextProps {
  text: string;
  className?: string;
}

function isSafeHref(href: string): boolean {
  if (href.startsWith("/")) {
    return !href.startsWith("//") && !href.includes("javascript:");
  }
  return ALLOWED_PATH.test(href);
}

export default function LinkifiedText({ text, className }: LinkifiedTextProps) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const regex = new RegExp(LINK_PATTERN.source, "g");

  while ((match = regex.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (isSafeHref(href)) {
      const isInternal = href.startsWith("/");
      parts.push(
        isInternal ? (
          <Link
            key={`link-${key++}`}
            href={href}
            className="font-semibold text-lime underline decoration-lime/40 underline-offset-2 hover:decoration-lime"
          >
            {label}
          </Link>
        ) : (
          <a
            key={`link-${key++}`}
            href={href}
            className="font-semibold text-lime underline decoration-lime/40 underline-offset-2 hover:decoration-lime"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      );
    } else {
      parts.push(full);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return <span className={className}>{parts}</span>;
}
