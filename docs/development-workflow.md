# Development workflow

## Setup

1. Use Node.js 26.1.0. `node -v` should report `v26.1.0` or another 26.x release that satisfies `>=26.1.0 <27`.
2. Use npm 12.0.2 (`packageManager` in `package.json`).
3. From the repository root, run `npm ci` so the install matches `package-lock.json`.
4. Run `npm run dev` and open http://localhost:3000.

Do not create a second Git repository inside this directory. The existing `.git` directory is the project history.

## Formatting

Prettier is the formatter. Configuration is `.prettierrc.json`: semicolons, double quotes, trailing commas, 80 columns, LF line endings.

```bash
npx prettier --write .
npm run format:check
```

`public/` is ignored. Brand files, including `public/README.txt`, must not be reformatted. `package-lock.json` is ignored.

ESLint uses `eslint-config-next` core web vitals, then `eslint-config-prettier` so formatting rules are not duplicated. The lint script is `eslint .`.

ESLint 9.39.5 is deprecated by the ESLint project, and it is the version the Next.js 16.4 plugins accept. `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react` declare peers only through ESLint 9. ESLint 10 was tried and lint completed, but npm had to override those peers, so it is not the configured version.

## JavaScript only

Write components as `.jsx` and modules without JSX as `.js`. Do not add TypeScript source, `tsconfig.json`, or a TypeScript dependency for application code. `eslint-config-next` still pulls TypeScript tooling for its own parser. That does not permit `.ts` or `.tsx` files in this repository.

Vitest tests use globals (`describe`, `test`, `expect`). Do not import those names from `vitest`. Vitest 5’s module runner evaluates that import separately, and the suite collector then fails because its runner was never set. Matchers from Testing Library are registered in `vitest.setup.js` through the global `expect`.

## Quality commands before a change is shared

```bash
npm run lint
npm run format:check
npm test
npm run test:coverage
npm run build
npm run test:e2e
```

CI runs the same gates. See the testing strategy and security baseline for coverage and audit rules.

## Environment files

`.env.example` is the only environment file that belongs in Git. `.gitignore` ignores `.env*` and then un-ignores `.env.example`. Do not commit `.env`, `.env.local`, or any file that contains a secret. This foundation has no secrets.

## Brand assets

Files in `public/` are approved exports. Do not overwrite or recompress them as part of ordinary development. `axxis-social-square-4k.png` was removed from this directory because the file was truncated and no intact local copy existed. Do not put it back until a complete export is supplied. The homepage may reference the sized icons, the favicon, and `axxis-og-1200x630.png`. It must not reference the 4K masters. The asset inventory records why.
