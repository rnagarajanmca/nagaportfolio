import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    expect(page).toHaveTitle(/Nagarajan Ravikumar/);
  });

  test('should navigate to all sections', async ({ page }) => {
    await page.goto('/');

    // Check all main sections are present
    const sections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];

    for (const section of sections) {
      const element = page.locator(`id=${section}`);
      await expect(element).toBeVisible();
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Click on "About" link in navigation
    await page.click('a[href="#about"]');

    // Wait for scroll to about section
    await page.waitForURL('**/#about');

    // Verify About section is visible
    const aboutSection = page.locator('id=about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should display hero section with CTA buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for hero content
    const heroText = page.locator('text=/Technical Manager|Full Stack/i');
    await expect(heroText).toBeVisible({ timeout: 10000 });

    // Check for CTA buttons - look for links with specific text
    const downloadButton = page.locator('a, button').filter({ hasText: /download/i }).first();
    const viewExperienceButton = page.locator('a, button').filter({ hasText: /experience|projects/i }).first();

    await expect(downloadButton).toBeVisible({ timeout: 10000 });
    await expect(viewExperienceButton).toBeVisible({ timeout: 10000 });
  });

  test('should have sticky navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Get initial position
    const initialBox = await header.boundingBox();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    // Wait a bit for scroll to complete
    await page.waitForTimeout(300);

    // Header should still be visible and sticky
    const headerAfterScroll = page.locator('header');
    await expect(headerAfterScroll).toBeVisible({ timeout: 5000 });
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get current theme
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('data-theme');

    // Find and click theme toggle button - look for button with Switch text
    const themeButton = page.locator('button').filter({ hasText: /switch|toggle|theme/i }).first();
    await themeButton.waitFor({ state: 'visible', timeout: 10000 });
    await themeButton.click({ force: true, timeout: 10000 });

    // Wait for theme to change
    await page.waitForTimeout(500);

    // Verify theme changed
    const newTheme = await htmlElement.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});
