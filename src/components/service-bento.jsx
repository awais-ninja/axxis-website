"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { serviceHref, services } from "@/lib/services";
import { ServiceMark } from "@/components/service-mark";

export function ServiceBento() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (reduce || !finePointer) {
      return undefined;
    }

    function onMove(event) {
      const card = event.target.closest("[data-service-card]");
      if (!card || !root.contains(card)) {
        return;
      }

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="services" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
          Services
        </h2>
        <p className="mt-3 max-w-2xl text-grey">
          Seven areas of work. Each name stays visible without hovering.
        </p>
        <div
          ref={rootRef}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          {services.map((service) => (
            <article
              key={service.slug}
              data-service-card
              className={`service-card relative overflow-hidden rounded-2xl border border-border bg-white p-5 transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 motion-reduce:transform-none ${service.span}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-navy">
                  <Link
                    href={serviceHref(service.slug)}
                    className="inline-flex min-h-11 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                  >
                    {service.name}
                  </Link>
                </h2>
                <ServiceMark slug={service.slug} />
              </div>
              <p className="mt-3 max-w-prose text-grey">{service.scope}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
