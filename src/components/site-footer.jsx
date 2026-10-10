import Link from "next/link";
import { primaryNavigation } from "@/lib/navigation";
import { serviceHref, services } from "@/lib/services";
import { formatCopyright, resolveCopyrightYear, site } from "@/lib/site";

export function SiteFooter() {
  const year = resolveCopyrightYear(
    process.env.NEXT_PUBLIC_COPYRIGHT_YEAR,
    null,
  );

  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-start gap-x-8 gap-y-4 px-4 py-8 text-sm">
        <div className="min-w-0 max-w-md flex-1 basis-60">
          <p className="font-semibold text-navy">{site.name}</p>
          <p className="mt-2 text-grey">{site.summary}</p>
        </div>
        <nav aria-label="Footer" className="min-w-0">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {primaryNavigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-navy underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul aria-label="Services" className="mt-4 flex max-w-sm flex-col">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="inline-flex min-h-11 items-center text-navy underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="w-full text-grey">
          {year === null ? "© AXXIS Works Ltd" : formatCopyright(year)}
        </p>
      </div>
    </footer>
  );
}
