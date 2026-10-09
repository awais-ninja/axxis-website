# Testing strategy

## Layers

| Layer      | Tool                                 | What it covers                                         |
| ---------- | ------------------------------------ | ------------------------------------------------------ |
| Unit       | Vitest                               | Site copy helpers and the security-header builder      |
| Component  | Vitest, React Testing Library, jsdom | Homepage shell, layout metadata, shadcn button         |
| End to end | Playwright, Chromium                 | Production homepage, image responses, security headers |

Playwright uses the production server (`next build` then `next start`), not the development server. Locally, `npm run test:e2e` builds before it starts. CI builds in its own step and sets `CI`, so Playwright only runs `npm run start`.

## Coverage policy

`npm run test:coverage` fails if v8 coverage of `src/**/*.{js,jsx}` falls below:

| Metric     | Minimum |
| ---------- | ------- |
| Statements | 85%     |
| Branches   | 80%     |
| Functions  | 85%     |
| Lines      | 85%     |

`coverage.include` is `src/**/*.{js,jsx}`. Vitest adds matching files that no test imported, so a new untested module is reported at 0%. `thresholds.perFile` is on, so that file fails the run even when the project average stays above the minimum. Test files are the only `src` exclusion. Configuration outside `src` (`next.config.mjs`, Playwright, Vitest, ESLint) is not application code and is not in the coverage set. Do not add exclusions to make a threshold pass.

`src/lib/utils.js` was previously a bare re-export. v8 skipped it as an empty file, which meant it never counted toward the thresholds. It is now a real `cn` function with a test. A module that contains no executable statements still cannot be instrumented; application code should not use that shape to sit outside the report.

The shell tests check the company name, the skip link target, landmarks, the sized logo source, the current-page home link, the copyright year, and metadata image paths. The header tests reject 4K paths and the damaged social square. Security-header tests cover the production and development policies separately.

## Playwright smoke tests

`tests/e2e/homepage.spec.js` checks:

- The homepage returns 200 and shows the company name.
- The production Content-Security-Policy matches the builder and has no `unsafe-eval`.
- `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy` are present.
- `X-Powered-By` is absent.
- The header image loads (`naturalWidth` greater than 0) and points at `axxis-icon-256.png`.
- Favicon, 32, 180, 192, and the 1200×630 Open Graph file return 200 with `nosniff`.
- The browser console reports no Content-Security-Policy violations.
- The first Tab stop is “Skip to content”.
- A 375px-wide viewport does not overflow horizontally.

One retry is allowed in CI. Locally, retries are off.

## CI quality gates

`.github/workflows/ci.yml` runs, on Node from `.nvmrc`:

1. `npm ci`
2. `npm run lint`
3. `npm run format:check`
4. `npm run test:coverage`
5. `npm run build`
6. Playwright Chromium install, then `npm run test:e2e`
7. `npm audit --omit=dev --audit-level=high`
8. `npm audit --audit-level=critical`

A final `npm audit` prints the full tree and is allowed to fail so the known dev-only high finding stays visible. See the security baseline for that finding. There is no deployment workflow.
