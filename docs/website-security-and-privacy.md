# Website security and privacy

Requirements for a later public site. This planning step adds no endpoint, secret, cookie, or header change. It is not a legal opinion and not a penetration test. The existing baseline in `docs/security-baseline.md` still applies.

## Current controls to keep

- Content Security Policy as implemented: production `script-src` is `'self' 'unsafe-inline'` with no `unsafe-eval` and no host wildcard. `script-src-attr 'none'`. `object-src` and `frame-src` are `'none'`. `form-action` and `base-uri` are `'self'`. `frame-ancestors` is `'none'`.
- The documented exceptions stay: inline scripts because of the Next.js bootstrap under Cache Components, and inline styles because of `next/image`.
- Development-only `unsafe-eval` and `ws:` / `wss:` stay off production responses.
- `nosniff`, `DENY`, `strict-origin-when-cross-origin`, locked-down Permissions-Policy, COOP and CORP `same-origin`, and `X-Powered-By` disabled.
- HSTS `max-age=15552000` without `includeSubDomains` or preload. Browsers ignore it on HTTP, including local `next dev` and `next start`.
- `upgrade-insecure-requests` stays off until HTTPS termination is in front of the site.
- Secrets stay out of Git. `.env*` is ignored except `.env.example`.
- CI fails on a high or critical production advisory and on any critical advisory. The dev-only `braces` finding stays visible and is not silenced by a downgrade.
- npm 12 install scripts stay unapproved unless a reviewed tool cannot run without one.

## Enquiry processing

### What Step 1.8 shipped

`/contact` renders the approved fields and keeps them disabled. `src/lib/enquiry-delivery.js` sets `enabled` to `false`. There is no Route Handler, Server Action, database write, email send, or browser storage of an enquiry. The honeypot name `company_website` is recorded for a later handler and is not rendered, so the page does not imply that spam protection is active. No phone number is collected.

### Activating delivery later

Do this only in an approved phase, and only together:

1. Confirm the recipient address and whether delivery is `mailto` or a named server-side provider (D4). Do not invent an address in the page.
2. Confirm retention and the lawful basis (D5).
3. Publish the privacy notice (Step 1.9) so it matches the real flow. Do not link a notice that does not exist.
4. If the limiter needs a shared store, confirm the production host first (D8).
5. Add one same-origin handler. Validate the checks in the table below. Reject unexpected fields. A filled honeypot and a rate-limit hit return the same generic failure. Do not log the message body.
6. Keep provider secrets in server-only environment variables.
7. Enable the inputs and the submit control in the same change that turns `enquiryDelivery.enabled` on. Until that change, the preview stays disabled.

The contact form, once delivery is approved, posts to a same-origin server handler (a Route Handler or a Server Action). The browser does not call an email vendor directly.

Validation on the server, repeated even if the browser checked the same rules:

| Check        | Limit                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| Name         | Required, trimmed, 1–100 characters                                           |
| Email        | Required, one address, 254 characters maximum                                 |
| Phone        | Out of the current form. Add it only if the owner approves the field later.   |
| Message      | Required, 10–5000 characters                                                  |
| Service      | Optional, must match one of the seven slugs in `docs/website-requirements.md` |
| Honeypot     | Must be empty                                                                 |
| Content type | The expected form or JSON shape only                                          |

Reject unexpected fields. Do not render the message as HTML in email or on the site. Store or forward plain text.

The handler returns the same generic failure for a honeypot hit and for a rate-limit hit, so the response is not a useful oracle. Validation errors for real fields stay specific so people can correct them.

## Rate limiting and abuse controls

Launch controls, in order:

1. Honeypot field, ignored by assistive tech and omitted from the visual form.
2. Per-IP rate limit on the enquiry handler. Proposed threshold: 5 accepted attempts per hour, with a small burst for validation retries. The exact number can move after real traffic, and it is a proposal.
3. Maximum body size so a large payload is refused before parsing the message.

An in-memory limiter is only honest on a single long-lived Node process. A serverless or multi-instance host needs a shared counter. That store is a hosting decision (D8) and is not chosen here. The implementation step must match the limiter to the host the owner approves, or keep the form unpublished.

A captcha or similar third-party challenge is optional. It needs a named vendor, a privacy-notice update, and a CSP change reviewed before use. Do not add `unsafe-eval` or a script wildcard to make a widget work.

## Email delivery and secrets

The site needs a path from the handler to the company. Options, with no vendor selected:

| Option                                                                                 | Cost                    | Notes                                                                                     |
| -------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| Publish an email address and use a `mailto` link, with no form                         | No vendor fee           | Nothing is stored. Weaker for some visitors. Acceptable as a first public contact method. |
| Server-side email through a provider the owner already pays for or explicitly approves | Depends on the provider | API key in the host’s secret store, read only on the server.                              |
| Store enquiries in a database                                                          | Depends on the host     | Adds retention, access control, and backup duties. Not proposed for launch.               |

`NEXT_PUBLIC_` variables are visible to the browser. The email API key, SMTP password, and any signing secret must use server-only environment variables. They must not appear in client components, logs, or error pages.

Proposed message content: the visitor’s name, email, optional phone, service slug, and message, plus the time of submission. No extra tracking identifiers.

## Privacy and UK GDPR

If the form collects personal data, AXXIS Works Ltd is the controller for those enquiries unless the owner says otherwise. The owner confirms the lawful basis with their adviser before launch (D5). A likely basis to discuss is steps taken at the person’s request before a contract, for the enquiry itself. That sentence is a prompt for the owner, not a concluded legal assessment.

The privacy notice must cover, in plain language:

- Controller identity and a contact method.
- The categories of data (name, email, optional phone, message, and the service they chose).
- The purpose: to read and reply to the enquiry.
- Recipients: the email provider, if one is used, and anyone inside the company who handles enquiries.
- Retention. Proposed default, pending D5: keep an enquiry only for as long as it takes to respond and record the outcome, and delete or anonymise it within 12 months if it has not become a customer record. Customer-record retention is a separate decision.
- The person’s rights of access, correction, erasure, restriction, and objection, and the right to complain to the ICO.
- Whether the data leaves the UK. An email provider outside the UK needs a stated transfer safeguard. Prefer a provider the owner can locate. Do not assume a region.

The form must not ask for special-category data. The notice tells people not to include it in the message.

Server logs that contain IP addresses are personal data. Keep them for security and operations, for a short proposed window of 30 days, and keep them out of the analytics discussion. The host’s log product has to match that window or the notice must say what the host actually does (D8).

## Cookies and consent

A launch without analytics, advertising, or embedded third-party media can ship with no cookie banner and no `/cookies` page. Document that choice in the privacy notice if any strictly necessary technical storage is introduced later.

Before any non-essential cookie or similar tracker:

- Name the tool and its purpose (D6).
- Block the tag until the person opts in.
- Record the choice.
- Add the cookie notice and the privacy-notice recipients.
- Extend CSP `script-src` and `connect-src` only with the specific hosts required. No wildcard.

Consent for optional analytics is separate from the enquiry acknowledgement.

## Dependency and deployment controls

- `npm ci` in CI from the lockfile. Node from `.nvmrc`.
- Production audit gate stays at high. Full-tree critical gate stays. The full audit remains printed.
- No new runtime dependency for the form until the delivery option is chosen. Prefer platform features first.
- Security headers are re-tested in Playwright when the policy changes. A new third-party host is a failing test until the policy and the tests list it.
- HTTPS at the edge before the site is public. Then add `upgrade-insecure-requests` at that edge and review HSTS. Preload stays off until the hostname and subdomains are ready.
- There is still no deployment workflow. Adding one is an implementation step after D8, not part of this plan.
- Error monitoring, if added, must scrub enquiry bodies and secrets. A free tier that still sends personal data off-site needs the same privacy review as a paid product.

## Operational monitoring

Proposed minimum before a public launch, using the host’s own logs where possible:

- Alert when the enquiry handler returns repeated server failures.
- Alert when the rate limiter trips far above the proposal, as a sign of abuse or of a threshold that is too low.
- A simple uptime check against `/` from outside the host, only if the host or an already-approved tool provides it at no extra cost.

Paid monitoring is an owner decision. It is not required to finish the planning gate.
