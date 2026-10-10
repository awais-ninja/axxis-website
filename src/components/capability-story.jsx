import { Reveal } from "@/components/reveal";
import { capabilityGroups, serviceBySlug } from "@/lib/services";

export function CapabilityStory() {
  return (
    <div>
      {capabilityGroups.map((group, index) => (
        <Reveal key={group.id} index={index}>
          <section
            id={group.id}
            className={index % 2 === 0 ? "bg-white py-16" : "bg-surface py-16"}
          >
            <div className="mx-auto w-full max-w-5xl px-4">
              <h2 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
                {group.title}
              </h2>
              <div className="mt-8 grid gap-8">
                {group.slugs.map((slug) => {
                  const service = serviceBySlug(slug);

                  return (
                    <article
                      key={slug}
                      id={slug}
                      className="scroll-mt-24 max-w-2xl"
                    >
                      <h3 className="text-xl font-semibold text-navy">
                        {service.name}
                      </h3>
                      <p className="mt-3 text-grey">{service.scope}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
