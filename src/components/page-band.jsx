export function PageBand({ eyebrow, title, lede, children, mark = null }) {
  return (
    <header className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-electric/25" />
        <div className="absolute right-0 bottom-0 h-56 w-56 translate-x-1/4 translate-y-1/4 rounded-full bg-navy-surface" />
        {mark ? (
          <div className="absolute top-16 right-8 hidden lg:block">{mark}</div>
        ) : null}
      </div>
      <div className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-white uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/90">{lede}</p>
        {children ? (
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        ) : null}
      </div>
    </header>
  );
}
