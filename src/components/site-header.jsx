import Image from "next/image";
import Link from "next/link";
import { primaryNavigation } from "@/lib/navigation";
import { site } from "@/lib/site";
import { SiteMenu } from "@/components/site-menu";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-electric bg-navy/90 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className={`inline-flex min-h-11 items-center gap-3 rounded-md ${focusRing}`}
        >
          <Image
            src={site.logo.src}
            width={48}
            height={48}
            alt=""
            priority
            className="size-12 rounded-md bg-white"
          />
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            {site.name}
          </span>
        </Link>
        <SiteMenu links={primaryNavigation} />
      </div>
    </header>
  );
}
