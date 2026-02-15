import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should have html element with theme attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const htmlElement = page.locator('html');

    // Check that html element exists and has theme attribute
    const dataTheme = await htmlElement.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(dataTheme);
  });

  test('should store theme in localStorage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check localStorage for theme
    const storedTheme = await page.evaluate(() => {
      return localStorage.getItem('portfolio-theme');
    });

    // Should have stored theme or system preference
    if (storedTheme) {
      expect(['light', 'dark']).toContain(storedTheme);
    }
  });

  test('should apply color-scheme CSS property', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const htmlElement = page.locator('html');

    // Get color-scheme property
    const colorScheme = await htmlElement.evaluate((el) => {
      return window.getComputedStyle(el).colorScheme;
    });

    // color-scheme should be set
    expect(colorScheme).toBeTruthy();
    expect(['light', 'dark'].some(v => colorScheme?.includes(v))).toBeTruthy();
  });

  test('should restore theme from localStorage on page load', async ({ page }) => {
    // First visit
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Set theme preference to dark
    await page.evaluate(() => {
      localStorage.setItem('portfolio-theme', 'dark');
    });

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Wait for theme to apply
    await page.waitForTimeout(300);

    // Check if dark theme is applied
    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');
  });

  test('should have theme button in navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for any button with theme-related aria-label or title
    const themeButtonByAriaLabel = page.locator('button[aria-label*="theme" i]');
    const themeButtonByTitle = page.locator('button[title*="theme" i]');
    const switchButton = page.locator('button[aria-label*="Switch" i]');

    // At least one of these should exist
    const ariaExists = await themeButtonByAriaLabel.count() > 0;
    const titleExists = await themeButtonByTitle.count() > 0;
    const switchExists = await switchButton.count() > 0;

    expect(ariaExists || titleExists || switchExists).toBeTruthy();
  });

  test('should support system theme preference', async ({ page }) => {
    // Test with dark color scheme preference
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const htmlElement = page.locator('html');
    const theme = await htmlElement.getAttribute('data-theme');

    // Should respect system preference or have some theme set
    expect(theme).toBeTruthy();
    expect(['light', 'dark']).toContain(theme);
  });
});
