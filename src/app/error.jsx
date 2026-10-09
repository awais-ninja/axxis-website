"use client";

import Link from "next/link";

export default function RootError({ error, reset }) {
  void error;

  return (
    <>
      <h1 className="text-navy">Something went wrong</h1>
      <p className="mt-4 max-w-2xl text-lg text-grey">
        The page could not be displayed.
      </p>
      <p className="mt-6 flex flex-wrap gap-4">
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full bg-electric px-4 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          Home
        </Link>
      </p>
    </>
  );
}
