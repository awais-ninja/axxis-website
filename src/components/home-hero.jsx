import Link from "next/link";
import { ShinyText } from "@/components/shiny-text";
import { site } from "@/lib/site";

const actionClass =
  "inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white";

export function HomeHero() {
  return (
    <section className="relative isolate -mt-24 flex min-h-svh flex-col overflow-hidden bg-navy pt-24 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute -top-32 left-[12%] h-[34rem] w-[34rem] rounded-full bg-electric/30" />
        <div className="absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-navy-surface" />
      </div>
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16">
        <div className="lg:pr-44">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase">
            <ShinyText>AXXIS Works</ShinyText>
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] font-semibold tracking-tight text-white">
            {site.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            {site.supporting}
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 160 160"
            className="my-8 w-24 text-electric lg:absolute lg:top-16 lg:right-0 lg:my-0 lg:w-40"
          >
            <circle
              cx="80"
              cy="80"
              r="58"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="80"
              cy="80"
              r="36"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M58 58 L102 102 M102 58 L58 102"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquiry"
              className={`${actionClass} bg-electric text-white`}
            >
              Contact
            </a>
            <Link
              href="/services"
              className={`${actionClass} border border-white/70 text-white`}
            >
              Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
