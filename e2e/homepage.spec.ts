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

    // Check for hero content
    expect(await page.locator('text=/Technical Manager/').isVisible()).toBeTruthy();

    // Check for CTA buttons
    const downloadButton = page.locator('a:has-text("Download Resume")');
    const viewExperienceButton = page.locator('a:has-text("View Experience")');

    await expect(downloadButton).toBeVisible();
    await expect(viewExperienceButton).toBeVisible();
  });

  test('should have sticky navigation', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await header.boundingBox();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    // Header should still be at top
    const headerBoxAfterScroll = await header.boundingBox();
    expect(headerBoxAfterScroll?.y).toBe(0);
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    // Get current theme
    const htmlElement = page.locator('html');
    const initialTheme = await htmlElement.getAttribute('data-theme');

    // Find and click theme toggle button
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    await themeButton.click();

    // Wait for theme to change
    await page.waitForTimeout(300);

    // Verify theme changed
    const newTheme = await htmlElement.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});
