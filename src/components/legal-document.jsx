export const legalLinkClass =
  "text-electric underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric";

export function LegalDocument({ notice, sections }) {
  return (
    <article className="bg-white py-16">
      <div className="mx-auto w-full max-w-2xl px-4">
        <p className="rounded-2xl border border-border bg-surface px-5 py-4 leading-relaxed text-navy">
          {notice}
        </p>
        <nav aria-label="On this page" className="mt-8">
          <ul className="flex flex-col">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`inline-flex min-h-11 items-center ${legalLinkClass}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="mt-12 scroll-mt-24"
          >
            <h2
              id={`${section.id}-title`}
              className="text-2xl font-semibold tracking-tight text-navy"
            >
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-grey">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
