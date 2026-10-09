# Architecture

This is the Phase 1 engineering foundation. It provides a runnable App Router shell, a provisional design system, tests, a security-header baseline, and CI. It does not include page sections, deployment, or company claims beyond the legal name.

## Technology decisions

| Choice           | Decision                                                                      |
| ---------------- | ----------------------------------------------------------------------------- |
| Framework        | Next.js 16.4 App Router, `src/` directory                                     |
| Language         | JavaScript and JSX only                                                       |
| Styling          | Tailwind CSS 4                                                                |
| Components       | shadcn/ui `base-nova`, `tsx: false`, CSS variables                            |
| UI primitive     | `@base-ui/react` button, installed by the shadcn CLI                          |
| Fonts            | System stack (`Segoe UI`, Helvetica Neue, system-ui). No remote font request. |
| Package manager  | npm 12.0.2, committed `package-lock.json`                                     |
| Runtime          | Node.js 26, declared in `engines` and `.nvmrc`                                |
| Tests            | Vitest, React Testing Library, jsdom, Playwright                              |
| Cache Components | Kept from the Next.js 16.4 empty template, with `partialPrefetching: true`    |

`cacheComponents` turns on Partial Prerendering. `partialPrefetching` must be set when Cache Components are enabled. Both are scheduled to become unconditional in the next Next.js major release. The homepage is a static shell and does not use `use cache`.

The `shadcn` package is a devDependency. The app imports `shadcn/tailwind.css` at build time. It is not a production runtime library. `lucide-react` is not installed; `components.json` still names Lucide as the icon library for a later `shadcn add`.

## Application shape

- `src/app/layout.jsx` sets the document language, title, icons, and Open Graph image.
- `src/app/page.jsx` renders the shell: skip link, header, main, footer.
- `src/components/site-header.jsx` uses the 256px mark and the company name. It does not request a 4K master.
- `src/components/ui/button.jsx` is the shadcn button primitive. It is covered by component tests and is not mounted on the homepage, because the shell has no action that needs it.
- `src/lib/site.js` holds the name, description, and the asset paths the app is allowed to reference.
- `src/lib/security-headers.js` builds the response-header baseline. `next.config.mjs` applies it.

The page copy is the company name and the sentence “Corporate website for AXXIS Works Ltd.” Service descriptions, addresses, and slogans are out of scope.

The footer year comes from `NEXT_PUBLIC_COPYRIGHT_YEAR`. `next.config.mjs` sets that value from `copyrightYearFromClock()` when the Next.js process loads its config, so a build in a new year picks up the new year without a code change. The prerendered page does not call `new Date()`, because Cache Components reject that during static generation. A long-running server keeps the year from the build that produced the page; the next build refreshes it. If the variable is missing, the footer shows the company name without inventing a year. `package.json` sets `"type": "module"` so Node loads the header helper as ESM when `next.config.mjs` imports it.

## Colour tokens

Tokens live in `src/app/globals.css` as `--brand-navy`, `--brand-navy-surface`, `--brand-electric`, `--brand-grey`, `--brand-white`, and `--brand-surface`. shadcn semantic colours (`--primary`, `--background`, and the rest) point at those tokens.

The values were sampled from the approved artwork on 9 October 2026. They are provisional until a palette is approved. Neutral grey is `#5c6770`, darker than the sampled wordmark grey `#8d8d8e`, so body text clears WCAG AA on white (about 5.8:1). Electric blue `#2467fe` on white is about 4.7:1. White on deep navy `#041024` is about 19:1. Electric blue on navy is about 4.0:1, so it is not used for small text on the navy header.

A `.dark` token set exists for a future theme. The shell does not toggle it.

## Future staging and production

- Set `NEXT_PUBLIC_SITE_URL` to the real origin before metadata is shared.
- Terminate TLS in front of the app and only then enable `upgrade-insecure-requests` and review HSTS. See the security baseline.
- Do not deploy this foundation as the public site. There is no deployment workflow.
- Replace the JPEG-derived logo with vector artwork before treating the 4K files as production masters.
- Serve responsive, compressed derivatives. Do not add the 4K PNGs to page markup.
- Approve the colour tokens before they are treated as the brand standard.
