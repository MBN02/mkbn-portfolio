# Application Security & Privacy Posture

## 1. HTTP Security Headers (`public/_headers`)
Cloudflare Pages serves the following hardened response headers across all routes:
- `Content-Security-Policy`: Restricts script, style, image (`images.credly.com`, `i.ytimg.com`), and frame (`www.youtube-nocookie.com`) sources to trusted origins.
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: Disables unused browser hardware APIs (`camera=()`, `microphone=()`, `geolocation=()`, `usb=()`).

## 2. Data Privacy & Credential Hygiene
- **Zero Exposed Secrets**: No YouTube Data API keys or third-party tokens are bundled in client-side JavaScript.
- **Personal Phone Privacy**: Your mobile number is intentionally excluded from all public HTML pages and JSON-LD schemas to prevent automated scraping.
- **Privacy-Enhanced Video Embeds**: All YouTube players use `www.youtube-nocookie.com` and only initialize when a visitor explicitly clicks play.
- **Safe External Links**: All external links (`target="_blank"`) enforce `rel="noopener noreferrer"`.
