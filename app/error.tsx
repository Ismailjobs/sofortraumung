"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-navy px-4 py-16">
      <div className="max-w-md rounded-2xl border border-white/10 bg-navy-light p-8 text-center">
        <h1 className="text-xl font-extrabold uppercase tracking-tight text-white">
          Seite konnte nicht geladen werden
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Ein temporärer Fehler ist aufgetreten — oft hilft ein erneutes Laden,
          besonders nach einem Update der Website.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy transition hover:bg-lime-dark"
        >
          Erneut laden
        </button>
        <p className="mt-4 text-xs text-white/45">
          Oder{" "}
          <Link href="/" className="text-lime underline hover:text-lime-dark">
            zur Startseite
          </Link>
        </p>
      </div>
    </main>
  );
}
