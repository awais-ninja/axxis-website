import Link from "next/link";

export const metadata = {
  title: "Page not found · AXXIS Works Ltd",
  description: "That address is not part of the AXXIS Works Ltd website.",
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <h1 className="text-navy">Page not found</h1>
      <p className="mt-4 max-w-2xl text-lg text-grey">
        That address is not part of this website.
      </p>
      <p className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-electric px-4 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-full border border-navy px-4 text-sm font-medium text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
        >
          Contact
        </Link>
      </p>
    </div>
  );
}
