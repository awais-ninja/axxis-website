# Website design specification

UX specification for a later implementation. It does not change `globals.css`, components, or brand files. Tokens already in the app are the starting point. New visual values need owner approval (D7).

## Navigation

Desktop and tablet, from 640px upward:

- Skip link first in the tab order, visible on focus. The existing `SkipLink` stays.
- Header: company mark and name linking home, then the primary links in a row.
- Current page uses `aria-current="page"`, as Home already does.
- Contact is the primary action in the header once the contact page exists. It uses the existing button styles, with white text on electric blue, which clears AA for that control.

Mobile, below 640px:

- The same header identity.
- Primary links move into a button labelled “Menu”, which opens a list in the header. The control exposes `aria-expanded` and is a real button.
- The menu is in tab order and closes on Escape and on navigation.
- The first tab stop remains the skip link.

Footer:

- Primary links, then the seven service links once those routes exist, then legal links, then the existing copyright line.
- The groups wrap inside the current `max-w-5xl` container. They stack on small screens. They do not force a horizontal scrollbar.

The finished header is four items: Home, About, Services, Contact. Seven service names in the header would wrap and crowd the mobile menu. Services opens the overview. The footer lists the seven service links under a “Services” group once those routes exist. The roadmap names the step that adds each link.

## Layout

The shell already uses a 64rem (`max-w-5xl`) column, 16px side padding, and vertical rhythm of `py-12` / `sm:py-16`. Later pages keep that column so line length stays readable.

| Viewport      | Behaviour                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 320–639px     | One column. Menu button instead of the link row. Hero title uses the fluid scale and stays one screen’s opening. Bento and seven service cards stack. No pointer spotlight. No horizontal scroll. |
| 640–1023px    | Header row. Hero stacks. Bento is two columns. Service cards are two across.                                                                                                                      |
| 1024px and up | Layered navy hero, at least one viewport tall, then an asymmetric seven-service bento. Body sections stay near `max-w-2xl` inside the wider page.                                                 |

Breakpoints follow Tailwind’s existing `sm` and `lg` steps. No separate tablet stylesheet.

The homepage is a full-bleed navy composition. Until D13 is signed, the hero uses the confirmed positioning sentence. After sign-off it uses “Technology That Powers Business Growth.” and the approved supporting sentence. The 4K hero files stay archives. They are soft JPEG derivatives and are not the hero artwork.

## Three references, one system

The owner approved three references. They guide proportion, light, and sequence. They are not artwork, branding, or code to copy. Layouts, graphics, and wording are original to AXXIS Works.

| Reference                           | What it contributes                                                                     | What this site does instead                                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| NationFly Dark SaaS hero, Behance   | A dark technology hero: large type, electric light, layered depth, and obvious actions. | An original navy field, the AXXIS title, two links (Contact and Services), and CSS light. No borrowed screenshot, mock product, or logo.              |
| Niloofar Taefi bento grid, Dribbble | Asymmetric tiles, interactive cards, and small graphics.                                | An original seven-cell bento, one cell per approved service. Graphics are inline SVG built from the existing mark, not a copied illustration.         |
| apto.gr                             | A scroll that walks through capabilities.                                               | Native document scroll and Motion reveals. The story order is websites, software, care and IT, search and marketing, then automation. No scroll lock. |

The shared system is the navy and electric palette, the editorial title scale, the lit card surface, and one motion timing: a 16px rise, a 40ms stagger, once. The hero is the dark opening. The bento is the interactive catalogue. The sections after it are the narrative. Service, about, contact, and legal pages reuse the same header light, card surface, and type scale so the site does not change costume per page.

## Premium visual system

The site should read as a technology company at first glance: a large editorial title, a lit navy field, and service tiles that respond to the pointer. The identity is the AXXIS palette and the seven real services. It is not a pasted demo, a particle field, or a purple glass template.

Colour stays inside the provisional tokens. The hero background is a CSS field: `--brand-navy` as the base, a radial pool of `--brand-electric` at low opacity in the upper third, and a second pool of `--brand-navy-surface` toward the lower corner. White type sits on the navy. Electric blue remains the primary control and the link colour on white. A gradient must not be the only thing that makes text readable. Body copy on white stays `--brand-grey` or darker.

Typography is editorial in scale even on the system stack. The hero title uses `clamp(2.75rem, 7vw, 5.5rem)`, tight tracking, and a heavy weight. An eyebrow in small capitals sits above it. Section titles are `text-3xl` on desktop and `text-2xl` on small screens. Card titles are `text-xl`. A self-hosted grotesque can replace the system stack only under D15. No font is loaded from a third-party host. `font-src` stays `'self'`.

Desktop, from 1024px:

- The hero is at least one viewport tall and layered: CSS light at the back, title and two actions in front, a small original line-drawing of the mark off to one side. Contact is the primary button. Services is the secondary link. Both are visible without hover.
- The next section is one asymmetric bento on a 12-column grid. Website Design & Development and Custom Software Development span more columns. The other five services fill the remaining cells. None is hidden behind a control.
- Further sections tell the capability story in the order above. Each section names the real service. It links to the allow-listed page once that route exists.
- The header is a translucent navy bar over the hero. The current page is a pill.

Tablet, 640–1023px:

- The hero stacks. The title is full width. The mark drawing sits above the actions, smaller.
- The bento is two columns. Website Design & Development spans both columns. The other six services are single cells. All seven names are on screen as the user scrolls. None requires a carousel.
- The header stays one row: the mark and the primary links that exist at that step. The finished row is Home, About, Services, and Contact.

Mobile, under 640px:

- One column. The hero title remains large. The light field is still. There is no pointer spotlight.
- The bento is seven stacked cards in the same order as the desktop reading order. Every service remains a link.
- Primary links sit in the labelled Menu button. The panel is a solid navy surface. It is still a button, a list, and links.

Service pages keep a single reading column on white, with a shorter navy header that reuses the same light field. The marketing capability list is a two-column grid from 640px and a stack below that. It is not a second bento and not a set of child routes.

## Hero concept

The server component renders the `h1` and the supporting sentence in the initial HTML, in white, at full opacity. A client island paints only the light field and, if used, a sheen.

The sheen is React Bits `ShinyText` in the JavaScript + Tailwind variant, and only on the eyebrow. The `h1` stays a normal heading. `ShinyText` sets a transparent text fill, so it must not be the only copy of the page title.

Colour stops for any gradient type are navy, white, and electric blue. The component’s default pink and violet stops are not used.

## Services presentation

The seven cells are the categories and slugs in `docs/website-requirements.md`. This document does not rename them. The home bento is the asymmetric seven-cell grid. The services overview repeats the same seven entries, as equal cards: an `h2`, a one-line scope, an original inline SVG, and a link. The graphic is decorative and `aria-hidden`. The name is the accessible name of the link. Detail hrefs are added in the step that creates those routes, so an earlier prototype does not link to a missing page.

`SpotlightCard` (JavaScript + Tailwind) supplies the pointer light after its window listener is shared, so seven cards do not register seven global listeners. Until that change, the cells use the same surface, border, and 2px `transform` lift in CSS. Focus-visible draws the electric ring. Hover is never required to read the service name.

The SVG language is original: strokes in white and electric blue, built from circles and the X already in the brand mark. One simple motif per service. No illustration is traced from Behance or Dribbble, and no new bitmap is added to `public/`.

## Navigation and scroll

The header does not become a bubble menu, a gooey indicator, or a card mega-menu. The current-page pill and the mobile panel are CSS, with a short Motion stagger on the open menu items. Escape, outside activation, and focus return stay as already specified.

Scroll stays the browser’s own scroll. Do not use a smooth-scroll library, wheel capture, or scroll pinning. That is the line between apto-style storytelling and scroll hijacking.

Motion runs `whileInView` once on sections below the hero: a 16px rise and a 40ms stagger. The hero title does not wait for this. The story sections are in the HTML in narrative order, so a reader who jumps still meets every service.

## Motion strategy

`motion` is the animation engine. Import it from `motion/react` inside client components. Pages stay server components.

| Piece                          | How it moves                                                                | Fallback                                                     |
| ------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Hero title and supporting line | Already visible. No opacity delay.                                          | The server HTML.                                             |
| Eyebrow sheen                  | `ShinyText`, paused when reduced motion is set.                             | Solid white eyebrow.                                         |
| Hero light                     | CSS gradients. A slow drift only when reduced motion is not set.            | The same gradients, still.                                   |
| Seven-service bento            | Shared-listener spotlight, then a 2px lift. CSS until that listener exists. | All seven names and links visible, stacked on small screens. |
| Story sections                 | One Motion reveal per section, native scroll.                               | The same sections, already in the document.                  |
| Mobile menu                    | Motion on the four links after the panel is open.                           | The list is usable immediately.                              |
| Forms and legal pages          | No entrance motion.                                                         | Unchanged.                                                   |

`useReducedMotion()` and `prefers-reduced-motion: reduce` skip sheen, stagger, and drift. Content stays at full opacity. Production CSP stays unchanged. If an implementation of `motion` needed `unsafe-eval` or a new script host, that choice would be rejected. This planning step has not installed the package.

## Library selection

Reviewed against Next.js 16, React 19, JavaScript/JSX, Node 26, and Tailwind 4. Nothing here is installed in this step. A later step copies a JavaScript + Tailwind registry file only after it repeats the licence, dependency, security, and compatibility review. It keeps the React Bits copyright notice and recolours the file to the AXXIS tokens. If the fetched file differs from this review, that step stops. No paid library or service is required for the launch path.

| Source                           | Planning review                                                                                                                                                  | Decision                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Tailwind and shadcn              | Already in the repo.                                                                                                                                             | Keep.                                                                    |
| Motion                           | MIT. React 19. Package `motion`, import `motion/react`. Motion+ is paid and unused.                                                                              | Primary engine.                                                          |
| React Bits `SpotlightCard-JS-TW` | MIT plus Commons Clause. Registry dependencies: none. Respects reduced motion and `:focus-visible`.                                                              | Use on the seven-cell bento only after one shared pointer listener.      |
| React Bits `ShinyText-JS-TW`     | Same licence. Registry dependencies: none. Stops the loop under reduced motion.                                                                                  | Eyebrow only. Not the `h1`.                                              |
| React Bits `GradientText-JS-TW`  | Same licence. Registry dependencies: none.                                                                                                                       | Not used. Clipped gradient headings fail the contrast target too easily. |
| React Bits `Aurora-JS-TW`        | Depends on `ogl@^1.0.11`. Continuous WebGL frame loop. The fetched source does not stop for reduced motion.                                                      | Rejected. The hero light is CSS.                                         |
| React Bits `MagicBento-JS-TW`    | Depends on `gsap@^3.13.0`. Ships placeholder titles, sets `select-none`, and turns motion off by viewport width.                                                 | Rejected. The bento is our grid plus `SpotlightCard`.                    |
| React Bits `FadeContent-JS-TW`   | Depends on `gsap` and `ScrollTrigger`. Sets `autoAlpha` to 0, which hides the children until scroll.                                                             | Rejected.                                                                |
| React Bits `GlareHover-JS-TW`    | No dependencies. Pointer-only, no reduced-motion path, and a fixed default size.                                                                                 | Not selected.                                                            |
| GSAP                             | No-charge commercial licence, Webflow, effective 30 April 2025. Not MIT.                                                                                         | Not installed. The selected interactions do not need it.                 |
| Aceternity UI                    | TypeScript and Motion. The site allows commercial use of free components. The licence page is written for paid items. Spotlight effects overlap `SpotlightCard`. | Not copied for launch.                                                   |
| Magic UI                         | Free components are MIT and TypeScript. Pro is a separate paid licence.                                                                                          | Not copied for launch. The bento is written here in Tailwind.            |

React Bits Pro, Aceternity All-Access, and Magic UI Pro are paid packs and are not part of this site. WebGL, three.js, and OGL are not part of the launch bundle.

## Service and marketing presentation

The services overview is a list of seven equal cards. Each card shows the confirmed name, the one-line scope, and a text link, “View Website Design & Development” or the equivalent name. Cards share the same heading level (`h2` under the page `h1`).

Digital Marketing & Advertising is one page, not a child route per channel. Under its `h1`, each confirmed capability is an `h2` and a short scope sentence:

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

Platform names identify the channel. They are not badges, partner logos, or endorsements. The page does not add a capability that is missing from this list. Related-service links follow the information-architecture table and sit after the capability list, before the enquiry prompt.

Other service pages use the same template: `h1`, scope, who it is for, related links, enquiry prompt. They do not use a results band, a logo wall, or a price table.

## Design tokens

Keep the provisional tokens:

| Token                  | Value     | Use                                           |
| ---------------------- | --------- | --------------------------------------------- |
| `--brand-navy`         | `#041024` | Header background, headings                   |
| `--brand-navy-surface` | `#0a2545` | Supporting navy surface                       |
| `--brand-electric`     | `#2467fe` | Primary button, links on white                |
| `--brand-grey`         | `#5c6770` | Body text on white                            |
| `--brand-white`        | `#ffffff` | Page background, text on navy and on electric |
| `--brand-surface`      | `#f4f7fb` | Quiet section background                      |
| Accent                 | `#e6f0ff` | Subtle highlight, not body text               |

Sampled wordmark grey `#8d8d8e` stays out of body text. Electric blue on navy stays off small text. White on navy is the header text treatment.

Typography stays on the system stack already set as `--font-sans` and `--font-heading`: Segoe UI, Helvetica Neue, system-ui, sans-serif. Do not add a hosted font. Proposed scale, using existing Tailwind sizes:

| Role                  | Size                                            |
| --------------------- | ----------------------------------------------- |
| Hero title            | `clamp(2.75rem, 7vw, 5.5rem)`                   |
| Section title         | `text-2xl`, and `text-3xl` from 1024px          |
| Body                  | `text-base` or `text-lg` for the lead paragraph |
| Navigation and footer | `text-sm`                                       |

Radius and the shadcn button stay as they are. A dark theme is not part of launch.

## Component inventory

Existing, keep and extend:

| Component    | Role                            |
| ------------ | ------------------------------- |
| `SkipLink`   | First focusable control         |
| `SiteHeader` | Identity and primary navigation |
| `SiteFooter` | Legal links and copyright       |
| `Button`     | Primary and secondary actions   |
| `cn`         | Class merging                   |

Proposed, not built:

| Component        | Role                                                        |
| ---------------- | ----------------------------------------------------------- |
| `SiteMenu`       | Mobile disclosure for primary links                         |
| `PageHeader`     | `h1`, optional lead, optional CTA                           |
| `Section`        | Landmark-free content block with a heading                  |
| `HeroField`      | CSS navy light field and optional `ShinyText` eyebrow       |
| `ServiceList`    | Seven service cards; spotlight only after a shared listener |
| `CapabilityList` | Marketing capabilities on the advertising page only         |
| `EnquiryForm`    | Labelled fields, errors, honeypot                           |
| `FieldError`     | Message wired with `aria-describedby`                       |
| `LegalPage`      | Narrow measure for policy text                              |
| `NotFoundView`   | Branded 404 content inside the shell                        |

Icons: `lucide-react` is not installed. Add it only when a control needs an icon that text cannot replace, and prefer text labels. Do not add an icon package for decoration.

## CTA hierarchy and enquiry journey

1. Primary: contact the company. Label proposed as “Contact us” until the owner chooses another. The action opens `/contact` or submits the form on that page.
2. Secondary: view services.
3. Tertiary: read About, for someone checking identity.

Journey: Home or a service page, then Contact, then a confirmation on the same page. There is no quote builder, price table, or calendar. The form’s service field, when shown, only lists approved categories.

## Forms and feedback

- Every control has a visible label. Placeholder text is not the label.
- Required fields are marked in text.
- On submit with errors, focus moves to an error summary at the top of the form. The summary links to each invalid field. Fields use `aria-invalid="true"` and `aria-describedby` pointing at the error.
- Errors are specific: “Enter an email address” rather than “Invalid”.
- The honeypot is not displayed and is not a tab stop.
- Success replaces the form with a confirmation and a link back to Home. The confirmation does not state a response time.
- A server failure keeps the values and offers the published email address when one exists, so the person has another path.
- Colour is not the only error signal. Text and the summary carry the meaning.

## Accessibility target

**WCAG 2.2 Level AA** for shipped pages. Minimum checks for each implementation step:

- Keyboard only, including the mobile menu and the form.
- Visible focus, at least as clear as the browser default. The header’s white-on-navy focus must remain visible.
- Contrast: body text at least 4.5:1, large text and non-text UI at least 3:1, against the actual background.
- Target size at least 24 by 24 CSS pixels for pointer inputs, with spacing where 24px targets sit close together (2.2 AA).
- Reflow at 320 CSS pixels without horizontal scrolling, extending the existing 375px smoke check.
- Text spacing and 200% zoom do not clip the header or the form.
- Status messages use a polite live region for success and for the error summary.
- `prefers-reduced-motion: reduce` disables hero, card, and scroll transitions. Content stays in the document at full opacity. The current shell does not animate yet.

## Images and performance

- `next/image` for content images, with width and height set so layout does not shift.
- Allowed delivery files remain those in `referencedAssetPaths` plus any later sized derivative the owner approves. Social delivery may use the existing 1200px Open Graph and Twitter files in metadata, not the 4K versions.
- Hero and background 4K files stay in `public/` as archives. They are soft upscales from a JPEG, documented in `public/README.txt` and the asset inventory.
- Home interaction JavaScript, excluding the Next.js runtime, has a testable target of 50 KB gzip or under. That figure is not a measurement from this planning step. The later home-sequence step measures it. `ogl` and GSAP are outside the intended launch set because they were rejected in review, not because a bundle was weighed here.
- A continuous animation frame runs only while a spotlight pointer is moving, or not at all when reduced motion is set. The hero does not run a WebGL loop.
- Largest Contentful Paint at 2.5 seconds, Interaction to Next Paint at 200 milliseconds, and Cumulative Layout Shift at 0.1 are launch targets at the 75th percentile on a mobile profile. They are checked later, with motion and with reduced motion. This document does not record a trace.
- Transparent logo boards can show a faint wash on a new background because their alpha floor is 18 or 28. Do not place them on an untested colour.
- The header mark stays at 48 CSS pixels from `axxis-icon-256.png`, with `priority` on the first screen.
- No video, no third-party image host, and no icon font.

## Brand limits that need the owner

These are limits, not new artwork:

- The logo is a JPEG extract, not a vector. Sharp print and large display need a vector or a native high-resolution export (D7).
- There is no dark stacked logo pair.
- Facebook, LinkedIn, and YouTube boards do not match those platforms’ current cover sizes. They are archives, not embeds.
- The social square is missing. Do not draw a replacement.
- The palette is provisional until D7.

Implementation uses the current files within those limits.
