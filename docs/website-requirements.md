# Website requirements

Planning record for Step 1.4. This document does not authorise public claims, and it does not change the application. Status labels:

| Label          | Meaning                                                            |
| -------------- | ------------------------------------------------------------------ |
| Confirmed      | Present in the repository or stated as a project rule              |
| Proposed       | Recommended for a later build, pending owner approval              |
| Assumption     | Working hypothesis, not a fact about the company                   |
| Owner decision | Must be supplied or approved before it is treated as a requirement |

The service portfolio below is owner-confirmed. The homepage headline and supporting sentence are proposed copy and still need final sign-off (D13).

## Confirmed foundation

The site is the corporate website for **AXXIS Works Ltd**. The running application is a Next.js 16.4 App Router shell in JavaScript and JSX. The only public sentence is “Corporate website for AXXIS Works Ltd.”

Confirmed constraints:

- Node.js 26 (`>=26.1.0 <27`) and npm 12.0.2, with `npm ci` from the lockfile.
- JavaScript and JSX only. No application TypeScript source.
- Tailwind CSS 4, shadcn `base-nova`, and the existing button primitive.
- System font stack. No remote fonts.
- Cache Components and Partial Prefetching stay enabled. The prerendered shell must not call `new Date()`.
- Coverage thresholds stay at 85% statements, 80% branches, 85% functions, and 85% lines, with per-file enforcement.
- CI remains the quality gate: lint, format, coverage, build, Playwright, production high audit, and critical audit.
- Brand files in `public/` stay as exported. 4K masters stay off the page. The truncated social square stays out until a complete export exists.
- Provisional colour tokens in `src/app/globals.css` are measurements, not a signed-off palette.
- No secrets are in Git. `.env.example` holds only `NEXT_PUBLIC_SITE_URL`.
- There is no deployment workflow and no chosen host.

## Confirmed positioning and services

**Confirmed:** AXXIS Works Ltd is a UK-based technology, software, IT and full-service marketing solutions company.

The owner confirmed the original six planning areas and added comprehensive marketing. SEO and the wider marketing offer are separate pages so each has a clear place in the navigation and a distinct search intent. Scope lines describe the work the company offers. They are not claims of customers, qualifications, awards, or past results.

| Service                            | Slug                               | Confirmed scope                                                                                      |
| ---------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Website Design & Development       | `website-design-development`       | Business websites, e-commerce, landing pages, redesigns, and responsive development.                 |
| Custom Software Development        | `custom-software-development`      | Custom web applications, business software, SaaS platforms, and tailored systems.                    |
| Website Maintenance & Support      | `website-maintenance-support`      | Updates, maintenance, troubleshooting, ongoing technical support, and website management.            |
| IT Support & Solutions             | `it-support-solutions`             | Technical troubleshooting, business IT assistance, system configuration, and consultancy.            |
| SEO & Search Marketing             | `seo-search-marketing`             | Technical SEO, on-page SEO, local SEO, Google Business Profile, search visibility, and optimisation. |
| Digital Marketing & Advertising    | `digital-marketing-advertising`    | The marketing capabilities listed below.                                                             |
| Business Automation & Integrations | `business-automation-integrations` | Business workflows, CRM integrations, APIs, process automation, and software integrations.           |

Routes are an explicit allow-list. A request for any other `/services/` slug is a 404. There is no generated route from arbitrary text.

Digital Marketing & Advertising includes these capabilities:

- Digital marketing strategy
- Social media marketing and management
- Google Ads and PPC
- Meta, Facebook, and Instagram advertising
- Email marketing and automation
- Content marketing and copywriting
- Branding and graphic design
- Lead generation
- Campaign planning and management
- Creative advertising
- Other marketing channels and solutions the owner has already confirmed as relevant

That last line covers channels of the same kind as the list. It does not authorise an unnamed discipline, a platform specialism, or a result claim. A capability that is not on this list stays off the page until the owner confirms it.

**Proposed copy, awaiting D13:**

- Headline: Technology That Powers Business Growth.
- Supporting sentence: From professional websites and custom software to IT support, automation and comprehensive marketing, AXXIS Works delivers integrated solutions for modern businesses.

The site must not invent customers, testimonials, case studies, prices, response times, guarantees, awards, or certifications.

## Audiences

**Assumption:** the first audiences are people who may hire the company, and people who need to verify who the company is. That includes business owners, operations leads, and technical buyers. A second audience is anyone who submits an enquiry and must understand how their details are used.

No audience research has been done. Treat segment names as a hypothesis.

## Launch essentials

These are proposed requirements for a first public version. They become build requirements only after the owner accepts this plan and supplies the facts each item needs.

| ID  | Requirement                                                                                                                                    | Depends on                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| R1  | Home, About, Services overview, and Contact. Service names use the confirmed portfolio. Homepage headline waits on D13                         | D13 for the headline. D2 only for registration and contact facts |
| R2  | One landing page for each of the seven confirmed categories, at its allow-listed slug, with distinct copy                                      | Resolved portfolio                                               |
| R3  | Enquiry path from every primary page and every service page to Contact                                                                         | None                                                             |
| R4  | Contact form with accessible validation, server-side checks, and abuse controls                                                                | D4, D5                                                           |
| R5  | A way for the company to receive the enquiry                                                                                                   | D4                                                               |
| R6  | Privacy notice that matches the data actually collected                                                                                        | D2, D4, D5                                                       |
| R7  | Accessibility statement aligned with the WCAG 2.2 AA target                                                                                    | Enquiry path, or a published email from D2                       |
| R8  | Cookie information only if a non-essential cookie or similar technology is used                                                                | D6                                                               |
| R9  | Website terms if the owner wants terms published, after review                                                                                 | D9                                                               |
| R10 | Unique titles and descriptions, `sitemap.xml`, and `robots.txt` on the real origin                                                             | D8                                                               |
| R11 | Organisation structured data limited to confirmed name, URL, and logo                                                                          | D2, D8                                                           |
| R12 | Branded not-found page                                                                                                                         | None beyond the shell                                            |
| R13 | Core Web Vitals targets recorded below, checked before a public launch                                                                         | D8                                                               |
| R14 | Content edited in the repository and released through the existing CI gate                                                                     | None                                                             |
| R15 | Premium interface: editorial navy hero, lit service cards, Motion, and the reviewed React Bits shortlist. Content stays visible without motion | D15                                                              |

Our Work is a launch page only when at least one project is verified (D3). Insights and a standalone FAQ are not launch requirements.

## Functional requirements

### Content

- Each page has one clear purpose, one primary call to action, and copy the owner has approved. Service names and scope lines may use the confirmed portfolio before D13 is signed.
- Each of the seven service pages describes that category’s confirmed scope, who it is for, and how to enquire. The marketing page lists only the confirmed capabilities. Pages do not quote fees or results.
- About may use the confirmed UK-based positioning. Registration, address, email, and phone appear only when the owner supplies them (D2).
- Empty sections are omitted. A heading with placeholder text is not acceptable.

### Contact and enquiries

Proposed fields:

| Field                   | Rule                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name                    | Required. Length limited.                                                                                                                                          |
| Email                   | Required. Format checked.                                                                                                                                          |
| Message                 | Required. Length limited.                                                                                                                                          |
| Phone                   | Optional.                                                                                                                                                          |
| Service interest        | Optional. Choices are the seven allow-listed slugs only.                                                                                                           |
| Consent acknowledgement | Required short statement that submitting the form uses the details to respond, with a link to the privacy notice. This is not a substitute for the privacy notice. |

The success state confirms that the message was received by the site’s delivery path. It does not promise a reply time. The failure state tells the person what to correct, or that the message could not be sent, and leaves their input in place.

Spam protection for launch is a honeypot field plus server-side rate limiting. A third-party captcha is an optional later control and needs owner approval because it adds a processor and a Content Security Policy change.

### Findability

- One `h1` per page.
- Title pattern proposed as `{Page} · AXXIS Works Ltd`, with Home using the company name plus a short approved descriptor once one exists.
- Descriptions are unique and written from approved copy.
- Canonical URLs use `NEXT_PUBLIC_SITE_URL` once that value is the production origin.
- `robots.txt` allows public pages and points at the sitemap. It does not block the site by default.
- Structured data is `Organization` (and `WebSite` if useful) with confirmed fields only. Review, rating, and offer markup stay out.

### Performance

Proposed field targets, measured on a mobile profile before launch:

| Metric                    | Target                                            |
| ------------------------- | ------------------------------------------------- |
| Largest Contentful Paint  | 2.5 seconds or faster at the 75th percentile      |
| Interaction to Next Paint | 200 milliseconds or faster at the 75th percentile |
| Cumulative Layout Shift   | 0.1 or lower at the 75th percentile               |

The page stays on the system font stack. Images that are referenced use `next/image` and the sized assets already allowed by `src/lib/site.js`. 4K files are not page sources.

These three figures, and the 50 KB home interaction budget in the design specification, are acceptance targets for a later measurement. This planning step has not measured them.

### Accessibility

The target is **WCAG 2.2 Level AA** for the pages this roadmap ships. The current shell already has a skip link, a `lang` attribute, a labelled primary landmark, and a header image with an empty alt because the company name is beside it. Later pages keep that pattern: visible focus, keyboard access, form errors tied to fields, contrast that meets AA, and no information by colour alone.

Electric blue `#2467fe` on navy is about 4:1 and stays off small text. Body grey stays at `#5c6770` or darker on white until a palette is approved.

### Premium interaction

The public site combines three approved references into one original system. The hero follows the dark technology direction of the NationFly Behance study. The services follow the asymmetric bento direction of the Niloofar Taefi Dribbble study, with all seven categories present. The page then follows the capability narrative of apto.gr, on native scroll. Those sites are references only. Their artwork, branding, and code are not copied.

The words, links, and form stay readable with animations off, with `prefers-reduced-motion: reduce`, and before JavaScript runs. The `h1` is server-rendered at full opacity. Both hero actions, Contact and Services, are visible without hover.

D14 is resolved. The launch stack is Tailwind, the existing shadcn source, the MIT `motion` package, and two React Bits JavaScript + Tailwind components that, at the planning review, listed no dependencies: `SpotlightCard` and `ShinyText`. `Aurora`, `MagicBento`, and `FadeContent` were reviewed and rejected because they add OGL or GSAP, hide content, or ship placeholder copy. Aceternity UI and Magic UI are not copied for launch. GSAP is not installed. A display face remains D15. The default is the system stack at the editorial scale in the design specification.

Copied React Bits source keeps its copyright notice and is recoloured to the AXXIS tokens. Copying a file waits until that step repeats the licence, dependency, security, and JavaScript/JSX compatibility review. Do not add `unsafe-eval` or a script host to satisfy an effect. No paid library, font host, email provider, analytics product, or template pack is required for the launch path.

## Optional later enhancements

These are out of the first public release unless the owner asks for them and accepts any cost:

- Insights or a blog, after a publishing cadence exists.
- A standalone FAQ, after real questions exist.
- Our Work, after verified projects exist.
- Analytics or advertising tags.
- A paid email, captcha, or error-monitoring vendor.
- A CMS.
- Dark theme, even though `.dark` tokens already exist.
- Customer login, payments, or a quote calculator.
- HSTS `includeSubDomains` or preload.
- WebGL backgrounds, scroll-hijacking, and paid UI template packs. GSAP is allowed later only for one named effect that Motion and the selected components cannot do inside the performance budget.

## Explicitly out of scope

- Invented credentials, testimonials, customers, case studies, prices, or guarantees.
- Replacement brand artwork.
- Changing Node, npm, Next.js, ESLint, or shadcn to silence the known `braces` advisory.
- A second repository, a nested repository, or a deployment pipeline in this planning step.
