"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white";

export function SiteMenu({ links, pathname: pathnameProp }) {
  const routedPathname = usePathname();
  const pathname = pathnameProp ?? routedPathname;
  const [open, setOpen] = useState(false);
  const [pathWhenOpened, setPathWhenOpened] = useState(pathname);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  if (pathname !== pathWhenOpened) {
    setPathWhenOpened(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function onKeyDown(event) {
      if (event.key !== "Escape") {
        return;
      }

      setOpen(false);
      buttonRef.current?.focus();
    }

    function onPointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="flex flex-wrap items-center justify-end">
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-white sm:hidden ${focusRing}`}
        aria-expanded={open}
        aria-controls="primary-menu"
        onClick={() => setOpen((current) => !current)}
      >
        Menu
      </button>
      <nav
        id="primary-menu"
        aria-label="Primary"
        className={
          open
            ? "flex w-full flex-col gap-2 pt-3 sm:w-auto sm:flex-row sm:items-center sm:pt-0"
            : "hidden sm:flex sm:items-center"
        }
      >
        <ul className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {links.map((link) => {
            const current = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-white ${focusRing} ${
                    current ? "bg-electric" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
