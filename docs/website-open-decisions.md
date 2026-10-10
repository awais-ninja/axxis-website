# Website open decisions

Decisions still open before the matching build step. D1, D13, and D14 are resolved and recorded below. “Proposed default” is a recommendation, not a decision, except where a row is marked resolved.

| ID  | Decision                                                                                                         | Proposed default if the owner wants one                                                                                                                                                                                                                                        | Blocks                                                                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| D1  | Service portfolio                                                                                                | **Resolved.** Seven categories, allow-listed slugs, and the scope lines in `docs/website-requirements.md`. SEO and comprehensive marketing are separate pages.                                                                                                                 | None. 1.6 and 1.7 use this list                                                                                    |
| D13 | Final sign-off of the homepage headline and supporting sentence                                                  | **Resolved.** The homepage `h1` is “Technology That Powers Business Growth.” The sentence under it is “From professional websites and custom software to IT support, automation and comprehensive marketing, AXXIS Works delivers integrated solutions for modern businesses.” | None.                                                                                                              |
| D14 | Animation stack for the premium interface                                                                        | **Resolved.** Tailwind, existing shadcn, MIT `motion`, and the reviewed React Bits pair `SpotlightCard-JS-TW` and `ShinyText-JS-TW`. No OGL, no GSAP in the launch bundle, no paid template pack                                                                               | None. 1.5A uses `motion` and `ShinyText`. 1.5B adds `SpotlightCard` after the shared-listener and copy-time review |
| D15 | Display typeface                                                                                                 | Keep the system font stack so `font-src` stays `'self'` and no remote font is required                                                                                                                                                                                         | A self-hosted face                                                                                                 |
| D2  | Facts that may be published: registered name, company number, registered office, VAT if any, public email, phone | Publish the legal name only until the rest is supplied                                                                                                                                                                                                                         | 1.6 About, 1.9                                                                                                     |
| D3  | Whether any project may be shown, with permission and a factual write-up                                         | Omit Our Work                                                                                                                                                                                                                                                                  | 1.11                                                                                                               |
| D4  | How enquiries are delivered: `mailto` only, or a named server-side email path                                    | **Still open.** `/contact` is published as a disabled preview. No recipient, provider, or send path is approved. See the activation steps in `docs/website-security-and-privacy.md`.                                                                                           | Delivery, before any handler                                                                                       |
| D5  | Lawful basis, retention, and whether enquiry text is kept after the reply                                        | Owner confirms with their adviser. Planning suggestion: delete or anonymise within 12 months if it is not a customer record                                                                                                                                                    | 1.8, 1.9                                                                                                           |
| D6  | Analytics or other non-essential tracking                                                                        | None at launch. No cookie banner                                                                                                                                                                                                                                               | 1.12, cookie page                                                                                                  |
| D7  | Palette sign-off, and whether a vector logo and a replacement social square will be supplied                     | Keep provisional tokens and current sized assets. Do not draw replacements                                                                                                                                                                                                     | Visual launch quality                                                                                              |
| D8  | Production hostname and host                                                                                     | Unset. `NEXT_PUBLIC_SITE_URL` stays local until then. No deployment workflow in this plan                                                                                                                                                                                      | 1.8 limiter, 1.10, 1.13                                                                                            |
| D9  | Whether to publish website terms                                                                                 | Omit until the owner asks and reviews the text                                                                                                                                                                                                                                 | Terms route                                                                                                        |
| D10 | Insights or FAQ                                                                                                  | Omit. Revisit only with a named author or real questions                                                                                                                                                                                                                       | None at launch                                                                                                     |
| D11 | Dark theme                                                                                                       | Leave the unused `.dark` tokens unused                                                                                                                                                                                                                                         | None                                                                                                               |
| D12 | HSTS `includeSubDomains` and preload                                                                             | Leave off until the HTTPS hostname is stable                                                                                                                                                                                                                                   | After 1.13                                                                                                         |

## Resolved service portfolio

D1 is closed. The public offer is:

1. Website Design & Development, `/services/website-design-development`
2. Custom Software Development, `/services/custom-software-development`
3. Website Maintenance & Support, `/services/website-maintenance-support`
4. IT Support & Solutions, `/services/it-support-solutions`
5. SEO & Search Marketing, `/services/seo-search-marketing`
6. Digital Marketing & Advertising, `/services/digital-marketing-advertising`
7. Business Automation & Integrations, `/services/business-automation-integrations`

Marketing capabilities on item 6 are scope, not evidence of clients or results. A channel that is not in the requirements list still needs the owner’s confirmation before it is written onto the page.

## Confirmed already

- The company name on the site is AXXIS Works Ltd.
- The company is a UK-based technology, software, IT and full-service marketing solutions company.
- The homepage headline is “Technology That Powers Business Growth.”
- The sentence under that headline is “From professional websites and custom software to IT support, automation and comprehensive marketing, AXXIS Works delivers integrated solutions for modern businesses.”
- The engineering foundation at `64b04272d21574a739d44e3bf264442f25c2f30c` is the baseline.
- The site is JavaScript and JSX, on Node 26 and npm 12.0.2.
- Brand binaries stay as exported. The social square is absent because the file was truncated.
- Colour tokens are provisional measurements.
- There is no approved testimonial, customer, case study, price, or guarantee in the repository.

## Assumptions that are not decisions

- Visitors are prospective clients and people checking the company’s identity.
- A first public site is a brochure plus an enquiry path, not a shop.
- The company is content to edit copy through Git until a CMS is separately approved.
- UK GDPR applies if personal data of people in the UK is collected. The owner confirms the controller details.

## Visual stack

The owner has also approved three visual references: the NationFly dark hero, the Niloofar Taefi bento, and the apto.gr capability scroll. They are references only. Implementation uses original layouts and inline SVGs. D14 is closed. Launch motion is `motion` plus `SpotlightCard` and `ShinyText` from the free React Bits registry, JavaScript + Tailwind only. At the planning review, both registry items declared an empty dependency list. The step that copies a file repeats that check, because the registry can change. `Aurora` (`ogl`), `MagicBento` (`gsap`, plus placeholder card copy), and `FadeContent` (`gsap` / ScrollTrigger, content hidden until scroll) failed review. Aceternity UI and Magic UI were not selected because the same jobs are covered without a TypeScript port or a second licence question. GSAP stays out unless a later, named interaction cannot be done inside the 50 KB interaction budget.

D15 asks whether to leave type on Segoe UI, Helvetica Neue, and system-ui at the editorial scale. A later self-hosted file is possible. A font request to Google or Adobe is not.

## Brand and asset follow-ups

- Supply a vector or native master if large, sharp logo use matters (D7).
- Supply a complete social square if that format is required. Do not restore the truncated PNG.
- Say which social profiles may be linked. None are confirmed, so structured data must not invent `sameAs` links.
