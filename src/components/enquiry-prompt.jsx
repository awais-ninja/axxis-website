import { EnquiryLink } from "@/components/enquiry-link";
import { site } from "@/lib/site";

export function EnquiryPrompt() {
  return (
    <section id="enquiry" className="scroll-mt-24 bg-navy py-16 text-white">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">
          Contact
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/90">{site.summary}</p>
        <p className="mt-4 max-w-2xl text-white/80">
          The contact page shows the enquiry fields. Online enquiries are not
          available yet.
        </p>
        <p className="mt-6">
          <EnquiryLink>Contact page</EnquiryLink>
        </p>
      </div>
    </section>
  );
}
