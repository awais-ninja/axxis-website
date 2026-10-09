# Website information architecture

Structure for the AXXIS Works Ltd site after the owner confirmed the service portfolio. The homepage headline remains proposed (D13). Pages marked **Hold** stay out of the build until the named decision is resolved. This document does not add routes.

Service URLs are an allow-list. Implementation must not accept an arbitrary slug.

## Sitemap

```text
/                                                      Home
/about                                                 About
/services                                              Services overview
/services/website-design-development                   Website Design & Development
/services/custom-software-development                  Custom Software Development
/services/website-maintenance-support                  Website Maintenance & Support
/services/it-support-solutions                         IT Support & Solutions
/services/seo-search-marketing                         SEO & Search Marketing
/services/digital-marketing-advertising                Digital Marketing & Advertising
/services/business-automation-integrations             Business Automation & Integrations
/contact                                               Contact
/privacy                                               Privacy notice
/accessibility                                         Accessibility statement
/cookies                                               Cookie notice, only if D6 requires it
/terms                                                 Website terms, only if D9 requires them
/work                                                  Our Work, hold until D3
/work/[slug]                                           Project detail, hold with /work
/insights                                              Not justified yet
/faq                                                   Not justified yet
```

The current app has `/` only, plus the framework not-found route.

Primary navigation, once those pages exist:

1. Home
2. About
3. Services
4. Contact

The header does not list all seven services. Services goes to the overview, which links to each allow-listed page. Our Work joins the primary navigation only with `/work`. Insights and FAQ do not.

Footer navigation:

- The same primary links.
- The seven service names, each linking to its allow-listed path.
- Privacy.
- Accessibility.
- Cookies, when that page exists.
- Terms, when that page exists.
- The copyright line already produced at build time.

## Internal linking

| From                                   | Links to                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------- |
| Home                                   | Services overview, all seven service pages, Contact                        |
| Services overview                      | All seven service pages, Contact                                           |
| Website Design & Development           | Website Maintenance & Support, SEO & Search Marketing, Contact             |
| Custom Software Development            | Business Automation & Integrations, Contact                                |
| Website Maintenance & Support          | Website Design & Development, IT Support & Solutions, Contact              |
| IT Support & Solutions                 | Website Maintenance & Support, Business Automation & Integrations, Contact |
| SEO & Search Marketing                 | Digital Marketing & Advertising, Website Design & Development, Contact     |
| Digital Marketing & Advertising        | SEO & Search Marketing, Website Design & Development, Contact              |
| Business Automation & Integrations     | Custom Software Development, IT Support & Solutions, Contact               |
| About, Contact, Privacy, Accessibility | Home and Contact, plus the footer set                                      |

A service page does not link to every other service. Related links follow the table. Contact links may carry the source slug so the enquiry form can pre-select that service. No link points at a route outside the sitemap.

No link points at a 4K asset or at the missing social square.

## Page specifications

### Home `/`

|               |                                                                                                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose       | State the confirmed positioning and route people to the seven services or to Contact.                                                                                                               |
| Audience      | A first-time visitor deciding whether to enquire.                                                                                                                                                   |
| Primary CTA   | Contact the company.                                                                                                                                                                                |
| Secondary CTA | View services.                                                                                                                                                                                      |
| Sections      | Header; proposed headline and supporting sentence once D13 is signed, otherwise the confirmed positioning sentence; seven service links; a short factual about strip; final enquiry prompt; footer. |
| SEO intent    | Brand search for AXXIS Works Ltd, and the confirmed descriptor as a UK technology, software, IT and marketing company.                                                                              |
| Hold          | The proposed headline until D13. Registration and contact facts until D2.                                                                                                                           |

### About `/about`

|             |                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose     | Publish the facts the owner agrees to show.                                                                                           |
| Audience    | A visitor checking identity before an enquiry.                                                                                        |
| Primary CTA | Contact.                                                                                                                              |
| Sections    | Who the company is; the facts approved for publication (registration, address, email, phone, as supplied); how to enquire.            |
| SEO intent  | Navigational query for the company name.                                                                                              |
| Hold        | History, headcount, a street address, or a credential the owner has not supplied. The confirmed line is that the company is UK-based. |

### Services overview `/services`

|             |                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Purpose     | List the seven confirmed services and route people to the matching page.                                                     |
| Audience    | A visitor comparing kinds of work.                                                                                           |
| Primary CTA | Open a service page.                                                                                                         |
| Sections    | Short intro from the confirmed positioning; one card per allow-listed service, with its name and scope line; enquiry prompt. |
| SEO intent  | A hub for the company’s services. Each card links to the page that should rank for that offer.                               |

### Service pages

Each row is a real route. The page explains that confirmed scope and invites an enquiry. It does not add customers, prices, guarantees, awards, or certifications. Unknown slugs are not generated.

| Page                               | Path                                         | SEO intent                                                                       |
| ---------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| Website Design & Development       | `/services/website-design-development`       | Business websites, e-commerce, landing pages, redesigns, responsive development. |
| Custom Software Development        | `/services/custom-software-development`      | Custom web applications, business software, SaaS platforms, tailored systems.    |
| Website Maintenance & Support      | `/services/website-maintenance-support`      | Updates, maintenance, troubleshooting, website management.                       |
| IT Support & Solutions             | `/services/it-support-solutions`             | Business IT assistance, configuration, consultancy.                              |
| SEO & Search Marketing             | `/services/seo-search-marketing`             | Technical, on-page and local SEO, Google Business Profile, search visibility.    |
| Digital Marketing & Advertising    | `/services/digital-marketing-advertising`    | The confirmed marketing capabilities, as one service.                            |
| Business Automation & Integrations | `/services/business-automation-integrations` | Workflows, CRM integrations, APIs, process automation.                           |

Shared page shape:

|                |                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Audience       | Someone with that need.                                                                                                          |
| Primary CTA    | Contact, with this slug pre-selected when the form exists.                                                                       |
| Sections       | What the work covers, using the confirmed scope; who it is for; related services from the linking table; enquiry CTA.            |
| Marketing page | The advertising page adds one subsection per confirmed capability. Those subsections are on this URL. They are not extra routes. |
| Exclusions     | No city doorway pages, no keyword variants, and no capability that is absent from the confirmed marketing list.                  |

### Our Work `/work` and `/work/[slug]`

**Hold.** A portfolio is justified only with projects the owner verifies: name, permission to publish, and a factual description. Until then the navigation has no Work item, and the site does not use sample projects.

A later project page would contain the verified summary, the work delivered, and a link back to the relevant service. It would not include invented results.

### Contact `/contact`

|             |                                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| Purpose     | Take an enquiry and show the published contact facts.                                |
| Audience    | A person ready to write to the company.                                              |
| Primary CTA | Submit the enquiry.                                                                  |
| Sections    | Short intro; form; published email or phone if supplied; link to the privacy notice. |
| SEO intent  | Navigational. The page can be indexed. Form responses are not a separate URL.        |

### Privacy `/privacy`

Required before a form stores or sends personal data. The page names the controller, what is collected, why, who receives it, how long it is kept, and how to exercise rights. Wording waits on D2, D4, and D5. This plan is not legal advice.

### Cookie notice `/cookies`

Publish this page when D6 adds a non-essential cookie, local storage used for tracking, or a similar technology. A launch with no analytics and no third-party tags does not need a cookie banner or this URL. Strictly necessary technical storage, if any is added later, is described in the privacy notice.

### Terms `/terms`

Publish only if the owner decides the site should carry website terms (D9). The page would cover use of the site. It would not invent service levels, prices, or liability positions. The owner reviews the text before it is public.

### Accessibility `/accessibility`

|             |                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Purpose     | State the WCAG 2.2 AA target, how to report a barrier, and any known gap.                                           |
| Audience    | A visitor who needs an alternative way to get in touch.                                                             |
| Primary CTA | Contact, by the same enquiry path or a published email.                                                             |
| Sections    | Target standard; contact method; known limitations, including brand-asset limits that affect contrast or sharpness. |
| SEO intent  | Trust and compliance support. Low search priority.                                                                  |

### Insights and FAQ

**Not justified for the first release.**

Insights needs a committed stream of original articles. A handful of thin posts would compete with the service pages and add maintenance. Revisit when the owner names an author, a topic list, and a cadence.

A standalone FAQ needs questions the owner has actually been asked. Invented objections are out of scope. If a few real answers exist later, they can live on the relevant service page before a `/faq` route is considered.

### Not found

The framework already emits `/_not-found`. Step 1.5 gives it the shared shell, explains that the address is unknown, and links to Home. A Contact link is added in Step 1.8, when `/contact` exists. It returns 404.

## Content rules for every page

- One `h1`, matching the page’s purpose.
- Primary CTA repeated at the end of long pages.
- Internal links use the sitemap above. No orphan launch pages.
- Images use the allowed sized assets, with alt text that adds meaning. Decorative marks keep an empty alt where the company name is adjacent, as the header already does.
- No page embeds the 4K masters.

## Labels

Header labels: Home, About, Services, Contact. Footer service labels use the seven confirmed names. Legal labels: Privacy, Accessibility, and Cookies or Terms only when those routes exist. “Our Work” is reserved for the held portfolio. “Get a quote” is not a label, because the site has no prices.
