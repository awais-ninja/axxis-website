import Link from "next/link";
import { LegalDocument, legalLinkClass } from "@/components/legal-document";
import { PageBand } from "@/components/page-band";

export const metadata = {
  title: "Accessibility · AXXIS Works Ltd",
  description:
    "How the AXXIS Works Ltd website approaches accessibility. This page does not claim WCAG compliance.",
};

const inlineLink = `inline-flex min-h-11 items-center ${legalLinkClass}`;

export default function AccessibilityPage() {
  return (
    <>
      <PageBand
        eyebrow="Accessibility"
        title="Accessibility"
        lede="This page describes how the AXXIS Works Ltd website is built to be used. It does not claim that the site meets WCAG 2.2 AA, and no independent assessment has been completed."
      />
      <LegalDocument
        notice="This statement describes the current website. It is not a certificate of compliance, and it does not publish an accessibility contact address."
        sections={[
          {
            id: "target",
            title: "Design target",
            content: (
              <p>
                The design target is the Web Content Accessibility Guidelines
                (WCAG) 2.2, Level AA. This page does not claim that the website
                meets that standard. No independent accessibility assessment has
                been completed, and none is recorded here.
              </p>
            ),
          },
          {
            id: "built",
            title: "How the site is built",
            content: (
              <>
                <p>
                  Pages are HTML. The document language is English. Each page
                  has one top-level heading, and the header, main content, and
                  footer are marked as landmarks. A link named Skip to content
                  is the first control in the keyboard order.
                </p>
                <p>
                  Keyboard focus is shown with a visible outline. On a narrow
                  screen, a button named Menu opens the same primary links used
                  in the header. Escape closes that menu and returns focus to
                  the button.
                </p>
                <p>
                  The contact form labels its fields. Those fields and the
                  submit control are disabled. Online enquiries are not
                  available yet. The form does not send, store, or email a
                  message.
                </p>
                <p>
                  Decorative graphics are hidden from assistive technology where
                  nearby text already names the company or the section. Type
                  uses fonts already installed on the device. No font is loaded
                  from another website.
                </p>
                <p>
                  If the browser is set to reduce motion, animations are
                  shortened, the homepage scroll-in motion does not run, and the
                  moving highlight on service cards is removed. The wording on
                  this page is in the HTML, so it remains available when
                  JavaScript is off.
                </p>
              </>
            ),
          },
          {
            id: "limitations",
            title: "Known limitations",
            content: (
              <>
                <p>
                  Contrast, zoom, reflow, and assistive-technology behaviour
                  have not been signed off. The colour palette is still
                  provisional. Motion and a pointer highlight are used on some
                  marketing sections. Reduced motion shortens or removes them.
                  That behaviour is implemented. It has not been formally
                  certified.
                </p>
                <p>
                  There is no published email address or phone number for
                  accessibility feedback. Online enquiries are not available
                  yet, so the form cannot receive a report.
                </p>
              </>
            ),
          },
          {
            id: "feedback",
            title: "Feedback and later review",
            content: (
              <>
                <p>
                  A contact method for accessibility feedback will be published
                  when one is approved. Until then, the{" "}
                  <Link href="/contact" className={inlineLink}>
                    contact page
                  </Link>{" "}
                  shows the enquiry fields and does not send them.
                </p>
                <p>
                  A formal review against the WCAG 2.2 AA target is still to be
                  done before a public launch. This page does not record that
                  review as complete.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
