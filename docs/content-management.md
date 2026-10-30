# Content Management Guide

All personal data, career history, skills, certifications, videos, case studies, and blog posts are decoupled from UI components so you can update content without touching React or Astro presentation code.

## 1. Updating Profile, Metrics, or Career Experience
- **Profile & Headline Metrics**: Edit `src/data/profile.ts`
- **Career Roles (Henkel, OpsRamp, HPE, etc.)**: Edit `src/data/experience.ts`
- **Resume PDF**: Replace `public/resume/Mohan-Kumar-BN-Platform-Engineer-Resume.pdf`

## 2. Adding or Updating Skills (`/expertise`)
- Edit `src/data/skills.ts`. Each skill entry is validated by `SkillDomainSchema` in `src/data/schemas.ts` and supports `evidenceLinks` (`project`, `blog`, `video`, or `repo`).

## 3. Adding a New Certification (`/certifications`)
- Add a new object to `src/data/certifications.ts` with your Credly badge image URL and public verification URL (`https://www.credly.com/badges/<uuid>/public_url`).

## 4. Adding a New Engineering Case Study (`/projects/[slug]`)
- Create a new `.mdx` file in `src/content/projects/<your-slug>.mdx` following the frontmatter schema defined in `src/content/config.ts`.
- Include a `mermaidDiagram` string and `topologyNodes` array to automatically render the interactive architecture blueprint.

## 5. Automated Sync for New Blog Posts & YouTube Videos (Zero-Touch)
- **Sync Engine (`scripts/sync-content.mjs`)**: Run `npm run sync:content` locally at any time, or let GitHub Actions run it automatically.
  - **YouTube (`@mkbn-tech`)**: Pulls the public Atom feed (`https://www.youtube.com/feeds/videos.xml?channel_id=UCrScDsPZSceXgZOLJGrOOIw`), detects any new Masterclass videos or Shorts not yet in `src/data/videos.ts`, classifies their engineering domain, and appends them automatically.
  - **Blog (`www.mkbntech.com`)**: Pulls the live Jekyll search index (`https://www.mkbntech.com/assets/js/data/search.json`), detects any new `/posts/<slug>/` articles, and generates a Zod-validated `src/content/blog/<slug>.mdx` article with canonical links back to `www.mkbntech.com`.
- **Scheduled GitHub Action (`.github/workflows/auto-sync-content.yml`)**:
  - Runs automatically every 6 hours (`cron: '0 */6 * * *'`), on manual click (`workflow_dispatch`), or via webhook (`repository_dispatch`).
  - When new videos or posts are found, it formats the files, runs `npm run test:unit` and `npm run build` to verify schema integrity, and commits directly to `main`—which automatically triggers Cloudflare Pages to redeploy `www.mkbn.in` within ~45 seconds.
