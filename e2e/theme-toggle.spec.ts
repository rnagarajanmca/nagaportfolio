import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should display theme toggle button', async ({ page }) => {
    await page.goto('/');

    // Look for theme toggle button
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    await expect(themeButton).toBeVisible();
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');

    const htmlElement = page.locator('html');

    // Get initial theme
    const initialTheme = await htmlElement.getAttribute('data-theme');

    // Find and click theme toggle button
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    await themeButton.click();

    // Wait for theme change
    await page.waitForTimeout(300);

    // Get new theme
    const newTheme = await htmlElement.getAttribute('data-theme');

    // Verify theme changed
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    await page.goto('/');

    // Clear localStorage to start fresh
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Reload to get system preference
    await page.reload();

    // Find and click theme toggle button
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    await themeButton.click();

    // Wait for storage update
    await page.waitForTimeout(300);

    // Check localStorage
    const storedTheme = await page.evaluate(() => {
      return localStorage.getItem('portfolio-theme');
    });

    // Stored theme should be 'light' or 'dark'
    expect(['light', 'dark']).toContain(storedTheme);
  });

  test('should apply theme to color-scheme CSS property', async ({ page }) => {
    await page.goto('/');

    const htmlElement = page.locator('html');

    // Get initial color-scheme
    await htmlElement.evaluate((el) => {
      return window.getComputedStyle(el).colorScheme;
    });

    // Click theme toggle
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    await themeButton.click();

    // Wait for theme change
    await page.waitForTimeout(300);

    // Get new color-scheme
    const newColorScheme = await htmlElement.evaluate((el) => {
      return window.getComputedStyle(el).colorScheme;
    });

    // color-scheme should be set
    expect(['light', 'dark']).toContain(newColorScheme);
  });

  test('should display current theme name', async ({ page }) => {
    await page.goto('/');

    // Theme button should contain 'Light' or 'Dark'
    const themeButton = page.locator('button[aria-label*="Switch to"]').first();
    const text = await themeButton.textContent();

    expect(text?.toLowerCase()).toMatch(/light|dark/);
  });

  test('should have accessible ARIA attributes', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.locator('button[aria-label*="Switch to"]').first();

    // Check ARIA label
    const ariaLabel = await themeButton.getAttribute('aria-label');
    expect(ariaLabel).toMatch(/Switch to (light|dark) mode/i);

    // Button should be focusable
    await themeButton.focus();
    const isFocused = await themeButton.evaluate((el) => {
      return el === document.activeElement;
    });

    expect(isFocused).toBeTruthy();
  });

  test('should restore theme from localStorage on page load', async ({ page }) => {
    // First visit to set theme
    await page.goto('/');

    const htmlElement = page.locator('html');

    // Set theme to dark
    await page.evaluate(() => {
      localStorage.setItem('portfolio-theme', 'dark');
    });

    // Reload page
    await page.reload();

    // Wait for theme to apply
    await page.waitForTimeout(300);

    // Check if dark theme is applied
    const theme = await htmlElement.getAttribute('data-theme');
    expect(theme).toBe('dark');
  });
});
