"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalError({ error, reset }) {
  void error;

  return (
    <html lang="en">
      <body>
        <main id="main" tabIndex={-1} className="px-4 py-12">
          <h1>Something went wrong</h1>
          <p className="mt-4">The page could not be displayed.</p>
          <p className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-full bg-electric px-4 text-sm font-medium text-white"
              onClick={() => reset()}
            >
              Try again
            </button>
            <Link href="/" className="inline-flex min-h-11 items-center">
              Home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
