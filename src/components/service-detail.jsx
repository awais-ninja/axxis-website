import Link from "next/link";
import { EnquiryLink } from "@/components/enquiry-link";
import { PageBand } from "@/components/page-band";
import { ServiceMark } from "@/components/service-mark";
import {
  marketingCapabilities,
  relatedSlugs,
  serviceDetails,
} from "@/lib/service-content";
import { serviceBySlug, serviceHref } from "@/lib/services";

export function ServiceDetail({ service }) {
  const detail = serviceDetails[service.slug];
  const related = relatedSlugs(service.slug)
    .map((slug) => serviceBySlug(slug))
    .filter(Boolean);
  const marketing = service.slug === "digital-marketing-advertising";

  return (
    <>
      <PageBand
        eyebrow="Services"
        title={service.name}
        lede={service.scope}
        mark={
          <ServiceMark slug={service.slug} className="size-28 text-electric" />
        }
      >
        <EnquiryLink>Contact</EnquiryLink>
      </PageBand>
      <article className="bg-white py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-navy">
            Who it is for
          </h2>
          <p className="mt-4 text-grey">{detail.forWhom}</p>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-navy">
            What the work covers
          </h2>
          <p className="mt-4 text-grey">{detail.notes}</p>
          {marketing
            ? marketingCapabilities.map((capability) => (
                <section key={capability.name} className="mt-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-navy">
                    {capability.name}
                  </h2>
                  <p className="mt-3 text-grey">{capability.detail}</p>
                </section>
              ))
            : null}
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-navy">
            Related services
          </h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={serviceHref(item.slug)}
                  className="inline-flex min-h-11 items-center text-electric underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center text-navy underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
              >
                All services
              </Link>
            </li>
          </ul>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-navy">
            Enquire
          </h2>
          <p className="mt-4 text-grey">
            The contact page is not published yet. This link goes to the enquiry
            section on the homepage.
          </p>
          <p className="mt-6">
            <EnquiryLink>Contact AXXIS Works about {service.name}</EnquiryLink>
          </p>
        </div>
      </article>
    </>
  );
}
