import Link from "next/link";
import { EnquiryLink } from "@/components/enquiry-link";
import { PageBand } from "@/components/page-band";
import { services, serviceHref } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = {
  title: "About · AXXIS Works Ltd",
  description: site.summary,
};

export default function AboutPage() {
  return (
    <>
      <PageBand
        eyebrow="About"
        title="About AXXIS Works Ltd"
        lede={site.summary}
      >
        <EnquiryLink>Contact</EnquiryLink>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
        >
          Services
        </Link>
      </PageBand>
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-5xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
            What the company offers
          </h2>
          <p className="mt-4 max-w-2xl text-grey">
            The public description of the work is seven service areas. Each area
            has its own page. The list is the offer. It is not a client list, a
            history, or a set of results.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="block rounded-2xl border border-border bg-surface p-5 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                >
                  <span className="text-lg font-semibold">{service.name}</span>
                  <span className="mt-2 block text-sm text-grey">
                    {service.scope}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-surface py-16">
        <div className="mx-auto w-full max-w-5xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
            How to enquire
          </h2>
          <p className="mt-4 max-w-2xl text-grey">
            A separate contact page is not published yet. The enquiry point on
            this site is the contact section of the homepage.
          </p>
          <p className="mt-6">
            <EnquiryLink>Contact AXXIS Works</EnquiryLink>
          </p>
        </div>
      </section>
    </>
  );
}
