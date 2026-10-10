"use client";

import { useEffect, useState } from "react";

export function ShinyText({ children }) {
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduce) {
    return <span className="text-white">{children}</span>;
  }

  return (
    <span className="shiny-text inline-block bg-clip-text text-transparent">
      {children}
    </span>
  );
}
