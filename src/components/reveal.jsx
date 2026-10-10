"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";

export function Reveal({ children, index = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!node || reduce) {
      return undefined;
    }

    let controls;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        controls = animate(
          node,
          { opacity: 1, y: [16, 0] },
          { duration: 0.45, delay: index * 0.04, ease: "easeOut" },
        );
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [index]);

  return <div ref={ref}>{children}</div>;
}
