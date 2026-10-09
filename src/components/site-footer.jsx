import { formatCopyright, resolveCopyrightYear } from "@/lib/site";

export function SiteFooter() {
  // The year is injected when Next.js loads its config, not while the page
  // prerenders. Cache Components reject new Date() in the static shell.
  const year = resolveCopyrightYear(
    process.env.NEXT_PUBLIC_COPYRIGHT_YEAR,
    null,
  );

  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-grey">
        <p>{year === null ? "© AXXIS Works Ltd" : formatCopyright(year)}</p>
      </div>
    </footer>
  );
}
