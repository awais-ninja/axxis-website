/**
 * Enquiry delivery stays closed.
 *
 * The contact page may show the approved fields. It must not send, store, or
 * discard personal information until a later phase does all of the following:
 * 1. The owner confirms a recipient address and a delivery method.
 * 2. The owner confirms retention and the lawful basis for the enquiry.
 * 3. The privacy notice matches that flow and has been approved. The
 *    provisional /privacy page does not satisfy this step.
 * 4. A same-origin handler validates name, email, message, and an optional
 *    service slug from the seven approved services.
 * 5. That handler rate-limits requests, rejects unexpected fields, and treats
 *    a filled honeypot named `company_website` as a silent failure.
 * 6. Provider secrets stay in server-only environment variables.
 *
 * Do not render the honeypot while this flag is false. A hidden field on the
 * preview would imply that spam protection is already active.
 * Do not collect a phone number unless the owner approves that field later.
 */
export const enquiryDelivery = Object.freeze({
  enabled: false,
  futureHoneypotName: "company_website",
});
