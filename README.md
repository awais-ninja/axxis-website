# AXXIS Works Ltd

Engineering foundation for the AXXIS Works Ltd corporate website. This repository is a Next.js App Router application written in JavaScript and JSX. It is not a finished marketing site.

## Requirements

- Node.js `>=26.1.0 <27` (local runtime used for this foundation: 26.1.0)
- npm `>=12.0.2 <13` (package manager pinned to 12.0.2)

`.nvmrc` records `26.1.0`. Do not switch the Node version automatically.

## Local setup

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` only if you need to override the public site URL. The foundation does not use secrets.

## Commands

| Command                 | Purpose                         |
| ----------------------- | ------------------------------- |
| `npm run dev`           | Development server              |
| `npm run build`         | Production build                |
| `npm run start`         | Serve the production build      |
| `npm run lint`          | ESLint                          |
| `npm run format:check`  | Prettier check                  |
| `npm test`              | Unit and component tests        |
| `npm run test:coverage` | Tests with coverage thresholds  |
| `npm run test:e2e`      | Playwright homepage smoke tests |

`npm run test:e2e` builds and starts the production server locally. In CI the workflow builds first, then Playwright starts that build.

## JavaScript only

Application source is `.js` and `.jsx`. Do not add `.ts` or `.tsx` source files. `jsconfig.json` exists so the `@/` alias resolves in the editor. It is not a TypeScript project.

## Further reading

- [Architecture](docs/architecture.md)
- [Development workflow](docs/development-workflow.md)
- [Testing strategy](docs/testing-strategy.md)
- [Security baseline](docs/security-baseline.md)
- [Asset inventory](docs/asset-inventory.md)
- [Website requirements](docs/website-requirements.md)
- [Information architecture](docs/website-information-architecture.md)
- [Design specification](docs/website-design-specification.md)
- [Security and privacy plan](docs/website-security-and-privacy.md)
- [Website testing plan](docs/website-testing-plan.md)
- [Delivery roadmap](docs/website-delivery-roadmap.md)
- [Open decisions](docs/website-open-decisions.md)
