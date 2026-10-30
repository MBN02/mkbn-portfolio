# Cloudflare Pages Deployment & Custom Domain Guide (`www.mkbn.in`)

## 1. Cloudflare Pages Build Settings
Connect your GitHub repository to **Cloudflare Pages** using the native Git integration:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | `Astro` |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `22` (automatically read from `.nvmrc`) |

> **Important**: Do not enable a separate GitHub Actions deployment workflow that conflicts with Cloudflare Pages' native Git integration. GitHub Actions (`ci-quality-gates.yml`) runs quality gates on PRs and pushes, while Cloudflare Pages handles preview and production deployments natively.

## 2. Custom Domain Configuration (`www.mkbn.in` & `mkbn.in`)
1. In the **Cloudflare Dashboard**, navigate to **Workers & Pages → your project → Custom domains**.
2. Click **Set up a custom domain** and enter `www.mkbn.in`.
3. Cloudflare will automatically create the required `CNAME` record pointing `www.mkbn.in` to `<project>.pages.dev`.
4. Also add the apex domain `mkbn.in` as a secondary custom domain (or configure a Bulk Redirect rule in Cloudflare DNS/Rules from `https://mkbn.in/*` to `https://www.mkbn.in/$1` with HTTP 301).

## 3. SSL/TLS & Edge Security Settings
- **SSL/TLS Encryption Mode**: Set to **Full (strict)**.
- **Always Use HTTPS**: Enable under **SSL/TLS → Edge Certificates**.
- **Minimum TLS Version**: Set to **TLS 1.2** (or TLS 1.3 enabled).
- **Security Headers**: Automatically applied from `public/_headers` (copied into `dist/_headers` during `npm run build`).
- **Redirects**: Automatically applied from `public/_redirects` (copied into `dist/_redirects` during `npm run build`).

## 4. Branch Protection Rules on GitHub
To ensure only verified builds deploy to production on `main`:
1. Go to **GitHub Repository → Settings → Branches → Add branch protection rule** for `main`.
2. Enable **Require a pull request before merging**.
3. Enable **Require status checks to pass before merging** and select `Lint, Typecheck, Unit Test, Build & E2E Accessibility`.
