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
          This section is the contact point on the site. A separate contact page
          is not published yet.
        </p>
      </div>
    </section>
  );
}
