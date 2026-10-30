# Mohan Kumar BN — Senior Platform Engineer & CNCF Kubestronaut Portfolio (`www.mkbn.in`)

World-class personal engineering portfolio for **Mohan Kumar BN** (Senior Platform Engineer @ Henkel, ex-OpsRamp / HPE, CNCF Certified Kubestronaut, and creator of **MKBN-Tech**).

## Architecture & Tech Stack
- **Framework**: [Astro 5](https://astro.build/) (Static-first architecture, zero unnecessary client JS)
- **Language & Validation**: Strict TypeScript + [Zod](https://zod.dev/) schema validation (`src/data/schemas.ts`)
- **Styling**: Tailwind CSS (`#080B12` Obsidian Black theme, blueprint grid, glassmorphic surfaces)
- **Interactive Islands**: React 19 + Motion (`PlatformPipelineHero`, `InteractiveSkillMap`, `ProjectCatalog`, `CertificationShowcase`, `BlogExplorer`, `VideoHub`, `ContactForm`)
- **Content Engine**: Astro Content Collections + MDX (`src/content/projects` & `src/content/blog`)
- **Testing & Quality Gates**: Vitest (unit/schema validation), Playwright + Axe-Core (E2E & WCAG 2.2 AA accessibility), ESLint, Prettier, `astro check`
- **Deployment Target**: Cloudflare Pages (`www.mkbn.in`)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:4321)
npm run dev

# 3. Run typecheck, lint, format check & unit tests
npm run check
npm run lint
npm run test:unit

# 4. Build production static site into dist/
npm run build

# 5. Run Playwright E2E & Accessibility test suite
npm run test:e2e
```

## Documentation
- [System & Frontend Architecture](docs/architecture.md)
- [Content Management Guide](docs/content-management.md)
- [Cloudflare Pages & Custom Domain (`www.mkbn.in`) Deployment Guide](docs/deployment.md)
- [Security & Privacy Posture](docs/security.md)
