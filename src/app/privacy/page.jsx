import Link from "next/link";
import { LegalDocument, legalLinkClass } from "@/components/legal-document";
import { PageBand } from "@/components/page-band";

export const metadata = {
  title: "Privacy · AXXIS Works Ltd",
  description:
    "Provisional notice of how the AXXIS Works Ltd website behaves today. It is not a complete privacy notice.",
};

const inlineLink = `inline-flex min-h-11 items-center ${legalLinkClass}`;

export default function PrivacyPage() {
  return (
    <>
      <PageBand
        eyebrow="Privacy"
        title="Privacy"
        lede="This provisional notice describes how this website behaves today. It is not a complete privacy notice, and it has not been approved for a public launch."
      />
      <LegalDocument
        notice="Provisional. Essential facts are still unconfirmed, so this page does not name a privacy contact, a host, a processor, a retention period, or a transfer arrangement."
        sections={[
          {
            id: "status",
            title: "Status of this notice",
            content: (
              <p>
                The published name on this website is AXXIS Works Ltd. This page
                records what the website does now. It is not a finished privacy
                notice, and it does not claim to meet a legal standard.
              </p>
            ),
          },
          {
            id: "enquiries",
            title: "Online enquiries",
            content: (
              <>
                <p>
                  Online enquiries are not available yet. The{" "}
                  <Link href="/contact" className={inlineLink}>
                    contact page
                  </Link>{" "}
                  shows the enquiry fields and keeps them disabled. The form
                  does not send, store, or email what is typed into it. The
                  website has no enquiry database and no email provider for form
                  messages.
                </p>
                <p>
                  No email address, phone number, or office address is published
                  for privacy requests or for any other contact.
                </p>
              </>
            ),
          },
          {
            id: "cookies",
            title: "Cookies, storage, and tracking",
            content: (
              <>
                <p>
                  The website code reviewed for this notice does not set a
                  cookie, does not write to browser storage, and does not load
                  analytics, advertising, or embedded media from another
                  website. Type is taken from fonts already on the device. A
                  cookie banner is not shown, because this implementation has no
                  non-essential cookie or similar tracker to accept or refuse.
                </p>
                <p>
                  That finding describes the website as built. It is not a
                  statement that a hosting or security service can never set a
                  cookie. No public host has been confirmed.
                </p>
              </>
            ),
          },
          {
            id: "hosting",
            title: "Hosting and technical records",
            content: (
              <p>
                Serving a page can involve technical connection details, such as
                an IP address, the address requested, and the time of the
                request. A host may record those details to deliver the page and
                to protect the service. This notice does not name a hosting
                provider, a processor, a place of processing, or how long any
                such record is kept, because none of that has been confirmed.
                Leaving those facts unnamed is not a denial that a future host
                may process them.
              </p>
            ),
          },
          {
            id: "unstated",
            title: "What this notice does not state",
            content: (
              <p>
                No lawful basis is stated for collecting personal data. No
                retention period is stated. No recipient of an enquiry is named,
                because the form does not deliver a message and no processor has
                been approved. No international transfer is described. A company
                number, registered office, and VAT number are not published.
              </p>
            ),
          },
          {
            id: "concerns",
            title: "Raising a concern",
            content: (
              <p>
                A method for sending a privacy request to the company is not
                published on this website. The{" "}
                <a href="https://ico.org.uk" className={inlineLink}>
                  Information Commissioner&apos;s Office
                </a>{" "}
                publishes information about data protection in the UK.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
