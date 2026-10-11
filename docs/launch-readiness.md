# Launch readiness

Step 1.13 result. This is a local review of the production build. It is not a public launch, a legal opinion, or an independent accessibility certification.

Measured on 11 October 2026 with Lighthouse against `next start` on `http://127.0.0.1:3001`, using the Playwright Chromium binary. Mobile runs use Lighthouse’s simulated mobile profile. Desktop runs use `--preset=desktop`. Lab Total Blocking Time is not Interaction to Next Paint.

## A. Technically complete

- Public routes render: Home, About, Services, seven service pages, Contact, Privacy, Accessibility, and the shell 404.
- No horizontal overflow at 320, 375, 390, 640, 768, 1024, 1280, 1440, or 1920 CSS pixels on those routes.
- One `h1` per page. The homepage `h1` is “Technology That Powers Business Growth.”
- Header, footer, service links, and Contact links resolve. Unknown service slugs and unpublished routes return HTTP 404.
- Keyboard skip link, mobile menu, and reduced-motion behaviour remain covered by Playwright. With reduced motion, all seven service names are in the homepage document.
- Essential content is in the server HTML. No analytics, tracking, or application cookies were set.
- Enquiry delivery stays disabled. The preview form does not POST.
- Search indexing stays off. Canonical URLs are omitted. `sitemap.xml` is an empty urlset. `robots.txt` allows fetching and does not advertise a host. Known HTML routes send `noindex`. `/privacy` stays out of the sitemap. No JSON-LD is published.
- Production CSP has no `unsafe-eval`. HSTS is `max-age=15552000` without `includeSubDomains` or `preload`, and browsers ignore it on this HTTP review.
- Text links use `#2261ef` so 14px text clears 4.5:1 on the surface tint. Marks and buttons keep `#2467fe`.
- Production `npm audit --omit=dev --audit-level=high` is the release gate. The nine high `braces` findings are dev-only.

## B. Needs owner decision

- D2. Company number, office, public email, and phone are unpublished.
- D4. Enquiry delivery is not active.
- D8. Production hostname and host are unset. Indexing stays off until the three production flags are set on that host.
- D6, D9, D10, and D12 stay on their current defaults: no analytics, no terms page, no insights or FAQ, and no HSTS preload.

## C. Requires legal or external review

- D5 and the privacy notice. `/privacy` is provisional and is not legally approved.
- Independent accessibility review. This pass used Lighthouse and the existing keyboard tests. No screen reader was used. WCAG 2.2 AA is the target, not a certification.
- Field Core Web Vitals. Lab results are below. They are not CrUX field data.

## D. Optional future enhancements

- Our Work, Insights, FAQ, Terms, and Cookies stay unpublished. Nothing in the current site requires them.
- Vector logo artwork and a signed-off palette.
- A reduced-motion Lighthouse trace. Reduced motion is tested in Playwright, not in a second Lighthouse profile.

## Lab performance

| Page     | Profile | Performance | Accessibility | SEO |   LCP | CLS |   TBT | Transfer |
| -------- | ------- | ----------: | ------------: | --: | ----: | --: | ----: | -------: |
| Home     | Mobile  |          95 |           100 |  66 | 2.50s |   0 | 188ms |    237KB |
| Home     | Desktop |         100 |           100 |  66 | 0.62s |   0 |  37ms |    233KB |
| Services | Mobile  |          97 |           100 |  66 | 2.29s |   0 | 134ms |    228KB |
| Services | Desktop |         100 |           100 |  66 | 0.58s |   0 |  41ms |    242KB |
| Contact  | Mobile  |          89 |           100 |  66 | 2.61s |   0 | 334ms |    223KB |
| Contact  | Desktop |         100 |           100 |  66 | 0.59s |   0 |  46ms |    232KB |

The SEO score is 66 because indexing is intentionally off (`is-crawlable`). Contact mobile LCP was 2.61s on two runs, above the 2.5s target. Home and Services mobile LCP met the target. CLS was 0. INP was not measured. Homepage JavaScript transfer in the first mobile run was about 180KB. These figures do not make the site production-ready.
