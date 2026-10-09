import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="inline-flex items-center gap-3 rounded-md">
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
        <nav aria-label="Primary">
          <Link
            href="/"
            aria-current="page"
            className="rounded-md px-1 py-2 text-sm underline-offset-4 hover:underline"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
