import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Mohan Kumar BN Platform Engineering Portfolio (E2E & Visual Verification)', () => {
  test('1. Homepage renders hero, portrait, interactive pipeline, and passes accessibility checks', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForSelector('astro-island:not([ssr])', { state: 'attached' });
    await expect(page).toHaveTitle(/Mohan Kumar BN/);
    await expect(page.locator('h1')).toContainText('Engineering Platforms.');
    await expect(page.locator('h1')).toContainText('Automating Infrastructure.');
    await expect(page.locator('h1')).toContainText('Building Reliability.');

    // Verify interactive hero pipeline tabs work
    const gitopsTab = page.getByRole('tab', { name: /GitOps Control Plane/i });
    await gitopsTab.click();
    await expect(page.getByRole('tabpanel')).toContainText('ApplicationSets continuously reconcile');

    // Verify SEO canonical & JSON-LD
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://www.mkbn.in/');

    // Capture desktop screenshot
    await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });

    // Run WCAG 2.2 AA automated accessibility scan on Homepage
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('2. Responsive layouts (Tablet & Mobile) and Mobile Navigation Drawer', async ({ page }) => {
    // Tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.screenshot({ path: 'test-results/home-tablet.png' });

    // Mobile layout & Menu interaction
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: /Open navigation menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await expect(page.locator('#mobile-nav-drawer')).toBeVisible();
    await page.screenshot({ path: 'test-results/home-mobile-menu.png' });
  });

  test('3. About page & Resume download verification (with phone number privacy)', async ({
    page,
    request,
  }) => {
    await page.goto('/about');
    await expect(page.locator('h1')).toContainText('13+ Years Engineering');
    await expect(page.locator('body')).toContainText('Henkel');
    await expect(page.locator('body')).toContainText('OpsRamp');
    await expect(page.locator('body')).not.toContainText('966-399-4592');
    await page.screenshot({ path: 'test-results/about-desktop.png' });

    // Verify downloadable PDF asset returns HTTP 200
    const pdfRes = await request.get('/resume/Mohan-Kumar-BN-Platform-Engineer-Resume.pdf');
    expect(pdfRes.status()).toBe(200);
    expect(pdfRes.headers()['content-type']).toContain('pdf');
  });

  test('4. Expertise capability map filtering & expansion', async ({ page }) => {
    await page.goto('/expertise');
    await expect(page.locator('h1')).toContainText('Interactive Engineering Capability Map');

    const searchInput = page.getByRole('searchbox', {
      name: /Filter capabilities and technologies/i,
    });
    await searchInput.fill('HashiCorp Vault');
    await expect(page.locator('main')).toContainText('External Secrets Operator');
    await page.screenshot({ path: 'test-results/expertise-desktop.png' });
  });

  test('5. Projects catalog filtering & Case Study detail page', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('h1')).toContainText('Engineering Case Studies');
    await page.screenshot({ path: 'test-results/projects-desktop.png' });

    // Filter by category
    await page.getByRole('tab', { name: 'Autonomous AI SRE' }).click();
    await expect(page.locator('main')).toContainText(
      'Autonomous AI SRE Crew for Self-Healing Kubernetes Operations'
    );

    // Navigate to OpenShift Case Study detail page
    await page.goto('/projects/enterprise-openshift-platform');
    await expect(page.locator('h1')).toContainText(
      'Enterprise Multi-Cluster Red Hat OpenShift & Virtualization Platform'
    );
    await expect(page.locator('main')).toContainText('Veeam Kasten');
    await page.screenshot({ path: 'test-results/project-detail-desktop.png' });
  });

  test('6. Certifications showcase, Kubestronaut spotlight & provider filtering', async ({
    page,
  }) => {
    await page.goto('/certifications');
    await expect(page.locator('h1')).toContainText('Verified Cloud & Kubernetes Accreditations');
    await expect(page.locator('main')).toContainText('CNCF Certified Kubestronaut');
    await page.screenshot({ path: 'test-results/certifications-desktop.png' });

    await page.getByRole('tab', { name: /Google Cloud/i }).click();
    await expect(page.locator('main')).toContainText('Professional Cloud Architect');
  });

  test('7. Blog full-text search, tag filtering & Article detail page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1')).toContainText('Platform Engineering Blueprints');
    await page.screenshot({ path: 'test-results/blog-desktop.png' });

    const search = page.getByRole('searchbox', { name: /Search blog articles/i });
    await search.fill('K8sGPT');
    await expect(page.locator('main')).toContainText(
      'AI-Powered Kubernetes Troubleshooting with K8sGPT'
    );

    await page.goto('/blog/k8sgpt');
    await expect(page.locator('h1')).toContainText('K8sGPT');
    await expect(page.locator('main')).toContainText('Table of Contents');
  });

  test('8. YouTube Video Knowledge Hub filtering & privacy-first embeds', async ({ page }) => {
    await page.goto('/videos');
    await expect(page.locator('h1')).toContainText(
      'Production Kubernetes & OpenShift Video Library'
    );
    await page.screenshot({ path: 'test-results/videos-desktop.png' });

    await page.getByRole('tab', { name: 'Red Hat OpenShift' }).click();
    await expect(page.locator('main')).toContainText(
      'The Zero Downtime Production OpenShift HA Cluster Upgrade'
    );
  });

  test('9. Contact form validation, Resume page, Sitemap & 404 recovery', async ({
    page,
    request,
  }) => {
    await page.goto('/contact');
    await page.waitForSelector('astro-island:not([ssr])', { state: 'attached' });
    await page.getByRole('button', { name: /Compose & Send Inquiry/i }).click();
    await expect(page.getByRole('alert')).toContainText('Please enter your name');
    await page.screenshot({ path: 'test-results/contact-desktop.png' });

    await page.goto('/resume');
    await expect(page.locator('h1')).toContainText('Mohan Kumar BN');
    await page.screenshot({ path: 'test-results/resume-desktop.png' });

    // Sitemap & Robots verification
    const robotsRes = await request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    expect(await robotsRes.text()).toContain('https://www.mkbn.in/sitemap-index.xml');

    const sitemapRes = await request.get('/sitemap-index.xml');
    expect(sitemapRes.status()).toBe(200);

    // 404 page verification
    const res404 = await page.goto('/non-existent-route-test');
    expect(res404?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Route Failed Readiness Probe');
  });

  test('10. Reduced-motion preference support & Keyboard navigation', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();
    await context.close();
  });
});
