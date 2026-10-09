# Security baseline

These controls are a starting point. They are not a penetration test, a certification, or a statement that the site is ready for production.

## Response headers

`src/lib/security-headers.js` builds the header set. `next.config.mjs` sends it on `/(.*)` and disables `X-Powered-By`.

| Header                       | Value                                                  |
| ---------------------------- | ------------------------------------------------------ |
| Content-Security-Policy      | See below                                              |
| X-Content-Type-Options       | `nosniff`                                              |
| Referrer-Policy              | `strict-origin-when-cross-origin`                      |
| X-Frame-Options              | `DENY`                                                 |
| Permissions-Policy           | `camera=(), microphone=(), geolocation=(), payment=()` |
| X-DNS-Prefetch-Control       | `off`                                                  |
| Cross-Origin-Opener-Policy   | `same-origin`                                          |
| Cross-Origin-Resource-Policy | `same-origin`                                          |
| Strict-Transport-Security    | `max-age=15552000`                                     |

`Strict-Transport-Security` is included so an HTTPS deployment can inherit a six-month max age. Browsers honour HSTS only on responses that were received over HTTPS. `next dev` and `next start` on `http://localhost` or `http://127.0.0.1` are not protected by this header; the browser ignores it. The value does not use `includeSubDomains` or `preload`. Review both before any production hostname is submitted to the preload list.

## Content Security Policy

Production policy:

```text
default-src 'self';
script-src 'self' 'unsafe-inline';
script-src-attr 'none';
style-src 'self' 'unsafe-inline';
img-src 'self';
font-src 'self';
connect-src 'self';
media-src 'self';
worker-src 'self';
manifest-src 'self';
object-src 'none';
frame-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none'
```

Development adds `'unsafe-eval'` to `script-src` and `ws:` `wss:` to `connect-src`. React’s development overlay uses `eval`, and the dev server uses a WebSocket. Production responses must not include `unsafe-eval`.

There is no host wildcard (`*`) and production does not include `unsafe-eval`. `script-src-attr 'none'` blocks inline event handlers such as `onclick`.

This policy matches the static shell. The homepage is prerendered, same-origin, and does not load third-party scripts, fonts, or images.

### Required exceptions

| Exception                    | Where                      | Why it is required                                                                                                                                                                                                              |
| ---------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `script-src 'unsafe-inline'` | Development and production | Next.js injects an inline bootstrap script. A nonce would have to be created per request, which forces dynamic rendering. Nonces are also incompatible with Partial Prerendering, and Cache Components enable that in this app. |
| `style-src 'unsafe-inline'`  | Development and production | `next/image` sets an inline `style` attribute. There is no separate `style-src-attr` relaxation; the style source is the exception.                                                                                             |
| `script-src 'unsafe-eval'`   | Development only           | React’s development overlay reconstructs server stacks with `eval`. The production builder does not add this token.                                                                                                             |
| `connect-src ws: wss:`       | Development only           | The dev server’s hot-reload socket is not covered by `'self'` on every browser. Production `connect-src` is `'self'` only.                                                                                                      |

`upgrade-insecure-requests` is omitted. On `next start` over HTTP it would upgrade same-origin images and scripts to HTTPS and break local and CI smoke tests. Add it at the TLS terminator when staging or production is served over HTTPS.

Experimental subresource integrity can add hashes to script files and still leave the inline bootstrap script blocked. It is not enabled.

## Dependency audit

CI fails if a production dependency is high or critical (`npm audit --omit=dev --audit-level=high`) or if anything in the full tree is critical (`npm audit --audit-level=critical`).

`npm audit` reports nine high findings and no critical findings. They are one advisory, GHSA-vfj7-8cjw-p6xm: `braces` can exhaust the stack on a deeply nested pattern. npm marks every published `braces` version, and 3.0.3 is still the latest. `micromatch` 4.0.8 depends on `braces@^3.0.3`. `fast-glob` 3.3.3, also the latest 3.x release, depends on that `micromatch`. No newer compatible release removes the advisory.

The nine reported packages and how they are reached:

| Reported package                                | Runs in production? | How it is reached                                                                                                                                                    |
| ----------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `braces@3.0.3`                                  | No                  | `micromatch@4.0.8`                                                                                                                                                   |
| `micromatch@4.0.8`                              | No                  | `fast-glob`                                                                                                                                                          |
| `fast-glob@3.3.1`                               | No                  | `@next/eslint-plugin-next@16.4.0`                                                                                                                                    |
| `fast-glob@3.3.3`                               | No                  | `shadcn@4.21.4`, `@shadcn/registry@0.1.3`, and `@ts-morph/common@0.27.0`                                                                                             |
| `@next/eslint-plugin-next@16.4.0`               | No                  | `eslint-config-next@16.4.0`                                                                                                                                          |
| `eslint-config-next@16.4.0`                     | No                  | Direct devDependency, used by `npm run lint` and CI                                                                                                                  |
| `shadcn@4.21.4`                                 | No                  | Direct devDependency. The app imports only `shadcn/tailwind.css` at build time. The CLI runs when someone invokes `shadcn`, not during `next build` or `next start`. |
| `@shadcn/registry@0.1.3`                        | No                  | Dependency of the shadcn CLI                                                                                                                                         |
| `ts-morph@26.0.0` and `@ts-morph/common@0.27.0` | No                  | Dependency of the shadcn CLI                                                                                                                                         |

`npm audit --omit=dev` does not list these packages. They are not part of the production server. The vulnerable glob code runs when ESLint scans the repository and when a developer runs the shadcn CLI. A hostile, deeply nested glob could hang that process. It is not a visitor-facing weakness of the website.

npm’s suggested fix installs `eslint-config-next@14.2.35` or `shadcn@1.0.0`. Both are major downgrades away from the Next.js 16.4 toolchain and are not applied. There is no override that points at a patched `braces`, because that release does not exist. CI still prints the full `npm audit` output and fails the job for a high or critical production dependency, or for any critical finding in the whole tree.

npm 12 blocks dependency install scripts unless they are approved. `unrs-resolver`’s postinstall is not approved. ESLint still runs. Do not approve install scripts unless a tool fails without them and the script has been reviewed.

## Secrets

`.gitignore` ignores `.env*` except `.env.example`. `.env.example` contains only `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
