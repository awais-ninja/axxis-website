import Link from "next/link";
import { EnquiryLink } from "@/components/enquiry-link";
import { PageBand } from "@/components/page-band";
import { ServiceMark } from "@/components/service-mark";
import { services, serviceHref } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = {
  title: "Services · AXXIS Works Ltd",
  description:
    "Seven services from AXXIS Works Ltd: websites, custom software, maintenance, IT support, search, marketing, and automation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBand eyebrow="Services" title="Services" lede={site.summary} />
      <section className="bg-surface py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col rounded-2xl border border-border bg-white p-5"
            >
              <ServiceMark slug={service.slug} />
              <h2 className="mt-4 text-xl font-semibold text-navy">
                {service.name}
              </h2>
              <p className="mt-3 flex-1 text-grey">{service.scope}</p>
              <p className="mt-5">
                <Link
                  href={serviceHref(service.slug)}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-electric underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                >
                  View {service.name}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-5xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-navy">
            Enquire
          </h2>
          <p className="mt-4 max-w-2xl text-grey">
            Choose a service above, or use the contact section on the homepage.
          </p>
          <p className="mt-6">
            <EnquiryLink>Contact</EnquiryLink>
          </p>
        </div>
      </section>
    </>
  );
}
