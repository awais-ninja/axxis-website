# Website testing plan

Acceptance criteria for work that follows this plan. This step does not add tests. The current strategy in `docs/testing-strategy.md` remains in force.

## Gates that stay

Every implementation step runs, and CI continues to run:

1. `npm run lint`
2. `npm run format:check`
3. `npm test`
4. `npm run test:coverage`
5. `npm run build`
6. `npm run test:e2e`
7. `npm audit --omit=dev --audit-level=high`
8. `npm audit --audit-level=critical`

Coverage of `src/**/*.{js,jsx}` stays at or above 85% statements, 80% branches, 85% functions, and 85% lines, enforced per file. New source files are included. Tests are the only `src` exclusion. Do not exclude a module to pass the gate.

Vitest keeps globals. Do not import `describe`, `test`, or `expect` from `vitest`.

Playwright keeps exercising the production server. New pages get an end-to-end check in the same Chromium project. Each new template is checked at 320, 375, 768, and 1024 CSS pixels and must not scroll horizontally. The mobile menu and the contact form also get a keyboard pass at 320px.

## Criteria by future step

The step numbers match `docs/website-delivery-roadmap.md`.

### 1.5 Shared chrome, metadata, and not-found

| Layer         | Acceptance                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | Nav data lists only routes that exist. Asset helpers still reject 4K paths and the missing social square.                                                                                                                 |
| Component     | Header lists only routes that exist. At the end of this step that is Home. It marks the current page, and the skip link still targets `#main`. Footer shows the copyright line and no link to a page that does not exist. |
| End to end    | Home still passes the current smoke test. The not-found URL returns 404 and shows a way back to Home. Keyboard: first Tab is “Skip to content”. Mobile menu opens, closes on Escape, and does not trap focus incorrectly. |
| Accessibility | `aria-current`, `aria-expanded`, and the menu button’s accessible name are present. Focus is visible on navy.                                                                                                             |
| Security      | Production CSP still matches `buildContentSecurityPolicy({ isDevelopment: false })`. No `unsafe-eval`.                                                                                                                    |

### 1.5A Hero prototype

D14 is resolved. This step uses `motion` and `ShinyText` only. `SpotlightCard` is not part of it.

| Layer         | Acceptance                                                                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | A reduced-motion flag skips the hero entrance and returns the final styles.                                                                                                                                                                                                                 |
| Component     | With reduced motion, the hero title is visible without waiting. With motion allowed, the title is in the document on first render, not mounted after a delay. The Contact and Services labels are visible without hover.                                                                    |
| End to end    | `prefers-reduced-motion: reduce` leaves the hero title and both action labels visible. Neither action links to `/services` or `/contact`, because those routes do not exist yet. The page does not scroll horizontally or capture the wheel. The mobile menu still opens from the keyboard. |
| Accessibility | Focus order is unchanged by animation. Animated nodes are not `aria-hidden` while they contain the page title.                                                                                                                                                                              |
| Performance   | The production build does not include `gsap`, `ogl`, or `three`. Playwright records no layout shift on the hero title during load. The `h1` text is not a `ShinyText` node. The 50 KB figure is not treated as a measured result in this step.                                              |
| Security      | Production CSP is unchanged: no `unsafe-eval` and no new script host. The copied `ShinyText` file was re-checked for licence, dependencies, and JavaScript/JSX compatibility before it entered the tree.                                                                                    |

### 1.5B Seven-service bento

| Layer         | Acceptance                                                                                                                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | The seven cells use the allow-listed names and slugs. One shared pointer listener serves the grid. Seven cards do not register seven listeners.                                                            |
| Component     | Every service name is visible with reduced motion, and without waiting for a hover.                                                                                                                        |
| End to end    | Keyboard can reach all seven names. None of those links targets a `/services/` URL yet. At 320, 768, and 1024 CSS pixels the bento does not scroll horizontally. Reduced motion leaves every name visible. |
| Accessibility | Each card link’s accessible name includes the service name. The graphic is `aria-hidden`.                                                                                                                  |
| Content       | Exactly the seven confirmed services. No eighth category, testimonial, price, or invented credential.                                                                                                      |
| Security      | `SpotlightCard` is copied only after the same licence, dependency, security, and JavaScript/JSX review as `ShinyText`.                                                                                     |

### 1.5C Native-scroll storytelling

| Layer         | Acceptance                                                                                                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| End to end    | With JavaScript disabled, the hero, all seven service names, the capability sections, and the enquiry prompt are in the document. The page scrolls with the browser default and does not capture the wheel.                                                     |
| Accessibility | Reduced motion skips the rise. Content is already at full opacity. Focus can reach both actions and every service link without waiting for an animation to finish.                                                                                              |
| Performance   | Home interaction JavaScript, excluding the Next.js runtime, is measured gzipped. The target is 50 KB or under. This planning document does not record that measurement. Missing the target fails the step. The build still excludes `gsap`, `ogl`, and `three`. |
| Content       | Section order is websites, software, care and IT, search and marketing, then automation. Copy uses the confirmed services only.                                                                                                                                 |

### 1.6 Broader page implementation

This step adds About and Services to the header before the end-to-end check. Contact stays out of the header until 1.8.

| Layer         | Acceptance                                                                                                                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component     | The services overview renders exactly the seven confirmed names. An eighth category is absent. Detail URLs are not required until 1.7.                                                                                                                                                            |
| End to end    | Home, About, and Services each return 200, have one `h1`, and expose Home, About, and Services in the header. Contact is not a header link yet. Titles are unique. At 320, 375, 768, and 1024 pixels the overview does not scroll horizontally. The hero Services action resolves to `/services`. |
| Accessibility | Heading order does not skip levels. Service cards are links with the service name in the accessible name. Contrast of body text on white uses `--brand-grey` or a darker approved token.                                                                                                          |
| Content       | No testimonials, client names, prices, guarantees, awards, or certifications. The home bento lists exactly the seven confirmed services in one document flow. Detail URLs are asserted in 1.7.                                                                                                    |

### 1.7 Service pages

| Layer         | Acceptance                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | The allow-list resolves only `website-design-development`, `custom-software-development`, `website-maintenance-support`, `it-support-solutions`, `seo-search-marketing`, `digital-marketing-advertising`, and `business-automation-integrations`. `services/websites` and any other unknown slug do not build a page. |
| Component     | Each page’s body contains its confirmed scope and not another service’s scope. The marketing page lists the confirmed capabilities and no child URLs.                                                                                                                                                                 |
| End to end    | All seven URLs return 200 with one `h1` and a link to the enquiry path that exists at this step. The home bento, the services overview, and the footer each link all seven names to those URLs. A 320px and 768px viewport does not overflow. An unknown service URL returns 404.                                     |
| Accessibility | One `h1`. Marketing capabilities are `h2` elements. Related links are real anchors. Keyboard can reach the enquiry link.                                                                                                                                                                                              |
| Content       | No testimonials, client names, prices, guarantees, awards, or certifications.                                                                                                                                                                                                                                         |
| SEO           | The seven allow-listed paths are the only service URLs later eligible for the sitemap. `/sitemap.xml` itself is asserted in 1.10, when that file is built.                                                                                                                                                            |

### 1.8 Contact form

| Layer         | Acceptance                                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | Delivery stays disabled. The page has the required labels, the seven service options, and a disabled submit control. A submit event does not call fetch or write storage. Server validation is deferred with delivery. |
| Component     | The status text says online enquiries are not available yet. No success message is shown. The honeypot name is not in the document.                                                                                    |
| End to end    | `/contact` returns 200. Header, hero, About, and service enquiry links resolve to `/contact`. The disabled control does not produce a POST.                                                                            |
| Security      | There is no enquiry handler. The page does not publish an email address, phone number, or office.                                                                                                                      |
| Accessibility | The status is a polite live region. Disabled fields are labelled. Keyboard can open Contact from the mobile menu.                                                                                                      |

Email delivery tests use a fake transport. They do not call a real provider.

### 1.9 Privacy, accessibility statement, and conditional legal pages

| Layer      | Acceptance                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component  | Privacy text includes the controller contact, purposes, recipients, and retention that D5 recorded. It does not claim a basis the owner has not confirmed. |
| End to end | Footer links resolve. Cookie and terms routes return 404 when D6 and D9 say those pages are absent.                                                        |
| Content    | The accessibility statement names WCAG 2.2 AA and a contact method.                                                                                        |

### 1.10 Sitemap, robots, and structured data

| Layer      | Acceptance                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit       | Sitemap paths equal the built public routes. `robots.txt` references the sitemap on `NEXT_PUBLIC_SITE_URL`.                                               |
| Unit       | JSON-LD contains the company name, canonical URL, and logo. It has no address, phone, `sameAs`, or rating unless that field is in the approved fact file. |
| End to end | `/sitemap.xml` and `/robots.txt` return 200 on the production server.                                                                                     |

### 1.11 Our Work, only after D3

| Layer      | Acceptance                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Unit       | Every card comes from a verified project record with a permission flag.                                 |
| End to end | The index and one detail page render the supplied facts and no metric that the record does not contain. |
| Negative   | With an empty project list, the route is not registered and the nav has no Work link.                   |

### 1.12 Analytics, only after D6

| Layer      | Acceptance                                                                                          |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Security   | CSP lists the exact new hosts. Production still has no `unsafe-eval` and no `*`.                    |
| End to end | With consent unset, the third-party host is not requested. After an opt-in, the request is allowed. |
| Privacy    | The cookie notice and privacy notice name the tool.                                                 |

## Accessibility and performance checks before a public launch

These sit on top of the per-step tests. They can be manual where automation is thin, and the result is written down:

- Keyboard pass on Home, the services overview, Digital Marketing & Advertising, Contact, and the mobile menu.
- 200% zoom and a 320px-wide viewport on Contact and on the services overview.
- Responsive pass at 320, 375, 768, and 1024 CSS pixels for the overview and the marketing page.
- Automated scan (the existing Playwright project plus an axe run, added when the first multi-page step lands) with no serious or critical violations on those templates.
- A mobile Lighthouse or equivalent trace against the production build for LCP, INP, and CLS, compared with the targets in the requirements. A miss blocks launch until the page is adjusted or the owner accepts a written exception.
- Header image still loads from `axxis-icon-256.png` and the 4K files are absent from the document.
- With `prefers-reduced-motion: reduce`, Home and `/services` show every service name immediately, and no scroll-driven animation runs.
- The hero `h1` is present in the initial HTML response.
- Disabling JavaScript still shows the hero text, the service links, and the contact path.
- The trace used for LCP, INP, and CLS is recorded with motion allowed and again with reduced motion. Both must meet the requirements targets, or the owner accepts a written exception.

## Security checks before a public launch

- Re-run the header assertions on `/` and on `/contact`.
- Confirm the enquiry request never leaves the origin in the browser network log, apart from an approved analytics host after consent.
- Confirm `.env.local` is untracked and the example file still has no secret.
- `npm audit --omit=dev --audit-level=high` exits 0.
- A review of the form handler for HTML injection in the email body.

## What this plan does not add

- A lower coverage threshold.
- Skipping Playwright by pointing it at `next dev`.
- Visual snapshot tests of the JPEG-derived artwork. Those files are archives and shift with compression. Behaviour and URLs are the regression signal.
