import Link from "next/link";
import { EnquiryPreview } from "@/components/enquiry-preview";
import { PageBand } from "@/components/page-band";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact · AXXIS Works Ltd",
  description:
    "Contact AXXIS Works Ltd. Online enquiries are not available yet.",
};

function ContactMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="h-36 w-36 text-electric"
    >
      <circle
        cx="80"
        cy="80"
        r="58"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="46"
        y="58"
        width="68"
        height="46"
        rx="6"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M50 64 L80 86 L110 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageBand
        eyebrow="Contact"
        title="Contact"
        lede={`${site.summary} The form on this page shows the enquiry fields. It does not send a message.`}
        mark={<ContactMark />}
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div className="rounded-2xl border border-border bg-white p-5 sm:p-8">
            <EnquiryPreview />
          </div>
          <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-navy">
              While enquiries are closed
            </h2>
            <p className="mt-4 text-grey">
              No email address, phone number, or office address is published
              here. The fields stay disabled so this page does not collect what
              you type.
            </p>
            <p className="mt-4 text-grey">
              The seven services are available to read in the meantime.
            </p>
            <p className="mt-6">
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-electric underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric"
              >
                Services
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
