# Website delivery roadmap

Future implementation steps. Step 1.4 is this planning set. Do not start 1.5 until the owner accepts the plan and the decisions that 1.5 needs. Each step ends at its STOP gate. A later step does not begin in the same change.

Branch naming for a later step: `feature/step-<id>-<short-topic>`, cut from the reviewed main branch. JavaScript and JSX only. No commit is part of Step 1.4.

## 1.4 Planning (this step)

|              |                                                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Requirements, architecture, design, security, tests, roadmap, and open decisions. No pages and no foundation behaviour change.      |
| Dependencies | Commit `64b04272d21574a739d44e3bf264442f25c2f30c` on a clean tree.                                                                  |
| Deliverables | The seven `docs/website-*.md` files and a README link to them.                                                                      |
| Tests        | None. The application is unchanged, so the existing suite is not re-run as a product change. Formatting of the new docs is checked. |
| Acceptance   | An owner can see what is confirmed, what is proposed, and which decisions block a build.                                            |
| STOP         | Wait for approval. Do not implement the site.                                                                                       |

## 1.4A Confirmed service portfolio

|              |                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scope        | Record the owner-confirmed positioning, the seven service categories, their allow-listed slugs, and the proposed homepage wording. Documentation only. |
| Dependencies | The 1.4 planning files on this branch.                                                                                                                 |
| Deliverables | Updates to the requirements, information architecture, design specification, roadmap, testing plan, and open decisions.                                |
| Tests        | Formatting and a consistency check that the same seven slugs appear in those documents.                                                                |
| Acceptance   | D1 is resolved. D13 was later resolved: Home uses the approved headline. Security and privacy requirements are unchanged.                              |
| STOP         | Do not start Step 1.5.                                                                                                                                 |

## 1.5 Shared chrome, metadata, and not-found

|              |                                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Extend the header, footer, and metadata helpers for the routes that will exist. Add the mobile menu behaviour and a branded not-found view. No marketing sections and no new service claims. |
| Dependencies | 1.4 accepted. The nav may list Home only until later pages exist, with the menu component ready for the later links.                                                                         |
| Deliverables | Updated shell components, a not-found view, unit and component tests, one Playwright update.                                                                                                 |
| Tests        | The 1.5 rows in `docs/website-testing-plan.md`, plus the existing coverage and CI gates.                                                                                                     |
| Acceptance   | Skip link, current-page state, CSP, and the 256px logo behaviour still hold. Unknown URLs return 404 inside the shell, with a link to Home.                                                  |
| STOP         | Review the chrome before any page copy lands.                                                                                                                                                |

Shared header, footer, and navigation are built here, before any later page test can require them. A link is added only in the step that creates its route, and in that same step, before the acceptance test that looks for it.

| Surface                                                                | Implemented in                           | First test that requires it |
| ---------------------------------------------------------------------- | ---------------------------------------- | --------------------------- |
| Skip link, header shell, Home link, mobile menu, footer copyright      | 1.5                                      | 1.5                         |
| Branded not-found view linking to Home                                 | 1.5                                      | 1.5                         |
| Header links for About and Services                                    | 1.6                                      | 1.6                         |
| Header Contact link, hero Contact href, and the not-found Contact link | 1.8                                      | 1.8                         |
| Footer group of the seven service links                                | 1.7                                      | 1.7                         |
| Footer links for Privacy and Accessibility                             | 1.9                                      | 1.9                         |
| Cookies or Terms in the footer                                         | 1.9, only if D6 or D9 requires that page | 1.9                         |

## 1.5A Hero prototype

|              |                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | NationFly-inspired hero only: CSS light field, server-rendered title, Contact and Services visible without hover, `ShinyText` on the eyebrow, reduced-motion path. Install `motion`. Copy only `ShinyText-JS-TW`, recoloured, with the copyright notice kept. Before that copy, repeat the licence, dependency, security, and JavaScript/JSX review. Stop if the registry file no longer matches the design specification. |
| Dependencies | 1.5. D14 is resolved. D15 only if a self-hosted font is in this step. The default is the current system stack at the editorial scale.                                                                                                                                                                                                                                                                                      |
| Deliverables | One sample hero on the existing home route. No service grid and no spotlight. Server-rendered title.                                                                                                                                                                                                                                                                                                                       |
| Tests        | The 1.5A rows in the testing plan, plus the existing coverage and CI gates.                                                                                                                                                                                                                                                                                                                                                |
| Acceptance   | The `h1` is in the first HTML response at full opacity. Both action labels are visible without hover. Their links point only at targets that already exist; `/services` and `/contact` are not used yet. Reduced motion shows the eyebrow as solid white. The production bundle does not contain `gsap`, `ogl`, or `three`.                                                                                                |
| STOP         | Review the hero before the bento starts.                                                                                                                                                                                                                                                                                                                                                                                   |

## 1.5B Seven-service bento

|              |                                                                                                                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Original asymmetric bento of the seven approved services, with inline SVGs. `SpotlightCard-JS-TW` only after one shared pointer listener, and only after the same copy-time licence, dependency, security, and JavaScript/JSX review as 1.5A. No copied illustration. No paid component pack. |
| Dependencies | 1.5A reviewed.                                                                                                                                                                                                                                                                                |
| Deliverables | The bento and its seven entries.                                                                                                                                                                                                                                                              |
| Tests        | Keyboard reachability of all seven links. No horizontal overflow at 320, 768, and 1024. Reduced motion leaves every name visible.                                                                                                                                                             |
| Acceptance   | Exactly the seven confirmed categories are visible and keyboard-reachable. Their links do not use `/services/` URLs until 1.7 creates those routes. Desktop is asymmetric. Small screens stack in the same reading order.                                                                     |
| STOP         | Review the bento before the scroll narrative starts.                                                                                                                                                                                                                                          |

## 1.5C Native-scroll storytelling

|              |                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Native-scroll sequence: hero, seven-service bento, capability sections in the documented order, enquiry prompt. Motion reveals once. No smooth-scroll library.                                                                        |
| Dependencies | 1.5B reviewed.                                                                                                                                                                                                                        |
| Deliverables | The home section order and the Motion wrapper.                                                                                                                                                                                        |
| Tests        | The story is in the document without JavaScript. Scrolling is the browser default. Reduced motion skips the rise. The 50 KB gzip interaction target is measured here. A miss fails the step. This plan does not record a measurement. |
| Acceptance   | Every service and both calls to action can be reached without waiting for an animation to finish.                                                                                                                                     |
| STOP         | Review the home sequence before 1.6. Header, footer, and the Home link already exist from 1.5.                                                                                                                                        |

## 1.6 Broader page implementation

|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Home, `/about`, and `/services`. Home keeps the reviewed 1.5C sequence. The overview uses the confirmed positioning and the seven service names. This step adds About and Services to the header, and points the hero Services action at `/services`, before its own acceptance test. It does not add a Contact header link, because `/contact` does not exist yet. Home already uses the approved D13 headline. About adds registration or contact facts only from D2. |
| Dependencies | 1.5C. D2 before any address, number, email, or phone is published.                                                                                                                                                                                                                                                                                                                                                                                                      |
| Deliverables | Content module, three routes, and tests that the overview shows all seven names. Detail links are the 1.7 deliverable.                                                                                                                                                                                                                                                                                                                                                  |
| Tests        | The 1.6 rows in the testing plan.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Acceptance   | The overview shows exactly the seven confirmed services. No testimonials, prices, awards, or invented credentials.                                                                                                                                                                                                                                                                                                                                                      |
| STOP         | Owner reads the three pages before service detail pages start.                                                                                                                                                                                                                                                                                                                                                                                                          |

## 1.7 Service pages

|              |                                                                                                                                                                                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | All seven allow-listed service pages, using the confirmed scope for each. The marketing page lists only the confirmed capabilities and does not add child routes. This step adds the seven service links to the footer, and points the home bento and the services overview at those routes, before its own acceptance test. |
| Dependencies | 1.6. The slug allow-list is closed: `website-design-development`, `custom-software-development`, `website-maintenance-support`, `it-support-solutions`, `seo-search-marketing`, `digital-marketing-advertising`, `business-automation-integrations`.                                                                         |
| Deliverables | One service template and those seven entries.                                                                                                                                                                                                                                                                                |
| Tests        | The 1.7 rows in the testing plan.                                                                                                                                                                                                                                                                                            |
| Acceptance   | Each allow-listed URL returns 200 with its own scope. Any other `/services/` slug returns 404.                                                                                                                                                                                                                               |
| STOP         | Owner approves the set before the form is wired to those slugs.                                                                                                                                                                                                                                                              |

## 1.8 Contact form

|              |                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | `/contact`, accessible client validation, server validation, honeypot, and a rate limiter matched to the chosen host. This step adds Contact to the header, points the hero Contact action at `/contact`, and adds the not-found Contact link, before its own acceptance test. Delivery uses the option from D4. A `mailto` launch is allowed when D4 chooses no provider. |
| Dependencies | Suggested order places this after 1.7. The form can be built from 1.5, and the service field is omitted until 1.7 has shipped. D4 and D5 if the form stores or sends personal data. D8 if the limiter depends on the host.                                                                                                                                                 |
| Deliverables | Form, handler, fake mail transport in tests, privacy link.                                                                                                                                                                                                                                                                                                                 |
| Tests        | The 1.8 rows in the testing plan.                                                                                                                                                                                                                                                                                                                                          |
| Acceptance   | Invalid input is explained. A successful submit reaches the approved transport and does not promise a reply time. Secrets stay server-side.                                                                                                                                                                                                                                |
| STOP         | Do not point DNS at the site until 1.9 and 1.10 are done.                                                                                                                                                                                                                                                                                                                  |

The contact page from this step is implemented. Enquiry delivery is not. The form is a disabled preview. D4, the recipient address, the provider, anti-spam deployment, and retention stay unresolved. Do not treat the enquiry system as operational.

## 1.9 Legal pages

|              |                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Scope        | Privacy notice and accessibility statement. Cookie notice only when D6 requires it. Terms only when D9 requires them. |
| Dependencies | 1.8’s actual data flow, plus D2 and D5.                                                                               |
| Deliverables | The pages that the decisions require, footer links, and 404s for the pages that were declined.                        |
| Tests        | The 1.9 rows in the testing plan.                                                                                     |
| Acceptance   | The privacy notice matches the handler. It does not describe a processor that is not used.                            |
| STOP         | Owner or their adviser reviews the notice before production traffic.                                                  |

## 1.10 Findability

|              |                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Per-page titles and descriptions, `sitemap.xml`, `robots.txt`, and Organization structured data from confirmed fields. Set the canonical origin only when D8 names it. |
| Dependencies | The routes from 1.6–1.9 that actually exist.                                                                                                                           |
| Deliverables | Metadata helper and the two text routes.                                                                                                                               |
| Tests        | The 1.10 rows in the testing plan.                                                                                                                                     |
| Acceptance   | Structured data has no unverified address, phone, profile, or rating.                                                                                                  |
| STOP         | Search Console or any webmaster account is optional and needs approval.                                                                                                |

## 1.11 Our Work

|              |                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------- |
| Scope        | `/work` and detail pages for verified projects only.                                               |
| Dependencies | D3 with at least one record that may be published.                                                 |
| Deliverables | Project content module and templates.                                                              |
| Tests        | The 1.11 rows in the testing plan, including the empty-list case that does not register the route. |
| Acceptance   | Every public project has an owner permission flag.                                                 |
| STOP         | If D3 is empty, skip this step entirely.                                                           |

## 1.12 Measurement, only if approved

|              |                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------- |
| Scope        | One analytics tool from D6, consent if it is non-essential, CSP hosts, and the cookie notice. |
| Dependencies | 1.9 and an explicit yes on D6, including any cost.                                            |
| Deliverables | Consent state and the tag gated on opt-in.                                                    |
| Tests        | The 1.12 rows in the testing plan.                                                            |
| Acceptance   | No request to the vendor before consent.                                                      |
| STOP         | A launch without analytics does not include this step.                                        |

## 1.13 Launch gate

|              |                                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope        | Accessibility and performance pass from the testing plan, HTTPS review, header retest, and a content read-through. No new features.                             |
| Dependencies | 1.5 through 1.10, plus 1.11 and 1.12 only if they were in scope.                                                                                                |
| Deliverables | A short written result of the manual checks. Fixes for failures are separate small changes.                                                                     |
| Tests        | Full CI, plus the launch checks in the testing plan.                                                                                                            |
| Acceptance   | WCAG 2.2 AA issues found at serious or critical are fixed or accepted in writing. Vital targets are met or accepted in writing. Production audit gate is green. |
| STOP         | Public DNS and hosting stay with the owner. This roadmap does not deploy.                                                                                       |

## Suggested order

1.4, then 1.5, 1.5A, 1.5B, 1.5C, 1.6, 1.7, 1.8, 1.9, 1.10, then 1.13. Insert 1.11 and 1.12 only after their decisions. A `mailto` contact in 1.8 can ship before a paid email provider exists. D14 is resolved, so 1.5A is no longer waiting on a library decision. It still waits until this planning revision is approved.

## Out of this roadmap

Insights, a standalone FAQ, a CMS, payments, a quote calculator, dark mode, HSTS preload, replacement brand artwork, GSAP, WebGL, and paid UI template packs. Each needs its own approved step.
