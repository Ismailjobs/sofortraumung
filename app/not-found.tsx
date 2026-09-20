import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-navy px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-tight text-lime">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/65">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-lime px-5 py-3 text-sm font-extrabold uppercase tracking-tight text-navy"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
