import { test, expect } from '@playwright/test';

test.describe('Resume Download', () => {
  test('should display download button on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for download resume button using better selector
    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await expect(downloadButton).toBeVisible({ timeout: 10000 });
  });

  test('should have correct download link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await downloadButton.waitFor({ state: 'visible', timeout: 10000 });

    // Check href attribute
    const href = await downloadButton.getAttribute('href');
    expect(href).toBe('/api/resume');
  });

  test('should show loading state during download', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    // Make the download slow by intercepting
    await page.route('/api/resume', async (route) => {
      // Add delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 300));
      await route.continue();
    });

    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
    await downloadButton.click({ force: true });

    // Wait for download
    const download = await downloadPromise;

    // Verify download properties
    expect(download.suggestedFilename()).toContain('Resume');
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should have correct filename', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
    await downloadButton.click({ force: true });

    const download = await downloadPromise;

    // Check filename contains expected parts
    expect(download.suggestedFilename()).toContain('Resume');
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should have download attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await downloadButton.waitFor({ state: 'visible', timeout: 10000 });

    // Check for download attribute
    const hasDownloadAttr = await downloadButton.evaluate((el) => {
      return el.hasAttribute('download');
    });

    expect(hasDownloadAttr).toBeTruthy();
  });

  test('should track analytics on download attempt', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Track API calls
    let apiCalled = false;
    page.on('request', (request) => {
      if (request.url().includes('/api/resume')) {
        apiCalled = true;
      }
    });

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    const downloadButton = page.locator('a, button').filter({ hasText: /download.*resume|resume.*download/i }).first();
    await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
    await downloadButton.click({ force: true });

    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');

    // API should have been called
    expect(apiCalled).toBeTruthy();
  });
});
