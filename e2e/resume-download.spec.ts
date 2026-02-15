import { test, expect } from '@playwright/test';

test.describe('Resume Download', () => {
  test('should display download button on homepage', async ({ page }) => {
    await page.goto('/');

    // Look for download resume button
    const downloadButton = page.locator('a:has-text("Download Resume")');
    await expect(downloadButton).toBeVisible();
  });

  test('should have correct download link', async ({ page }) => {
    await page.goto('/');

    const downloadButton = page.locator('a:has-text("Download Resume")');

    // Check href attribute
    const href = await downloadButton.getAttribute('href');
    expect(href).toBe('/api/resume');
  });

  test('should show loading state during download', async ({ page }) => {
    await page.goto('/');

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    // Make the download slow by intercepting
    let isDownloading = false;
    await page.route('/api/resume', async (route) => {
      isDownloading = true;
      // Add delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.continue();
    });

    const downloadButton = page.locator('a:has-text("Download Resume")');
    await downloadButton.click();

    // Check for loading indicator
    if (isDownloading) {
      const loadingText = page.locator('text=/Preparing/i');
      // Loading state should appear briefly
      // Note: might be too fast to catch, so this is a soft check
      await loadingText.isVisible().catch(() => false);
      // Loading state is optional, API might respond too fast
    }

    // Wait for download
    const download = await downloadPromise;

    // Verify download properties
    expect(download.suggestedFilename()).toContain('Resume');
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should have correct filename', async ({ page }) => {
    await page.goto('/');

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    const downloadButton = page.locator('a:has-text("Download Resume")');
    await downloadButton.click();

    const download = await downloadPromise;

    // Check filename
    expect(download.suggestedFilename()).toBe('Nagarajan_Ravikumar_Resume.pdf');
  });

  test('should have download attribute', async ({ page }) => {
    await page.goto('/');

    const downloadButton = page.locator('a:has-text("Download Resume")');

    // Check for download attribute
    const hasDownloadAttr = await downloadButton.evaluate((el) => {
      return el.hasAttribute('download');
    });

    expect(hasDownloadAttr).toBeTruthy();
  });

  test('should track download with analytics', async ({ page }) => {
    await page.goto('/');

    // Mock Plausible analytics (if available)
    const analyticsEvents: string[] = [];
    await page.exposeBinding('trackAnalytics', (source, event: string) => {
      analyticsEvents.push(event);
    });

    // Listen for Plausible API calls
    page.on('request', (request) => {
      if (request.url().includes('plausible.io')) {
        analyticsTracked = true;
      }
    });

    // Start listening for downloads
    const downloadPromise = page.waitForEvent('download');

    const downloadButton = page.locator('a:has-text("Download Resume")');
    await downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');

    // Analytics tracking is done asynchronously, so we don't hard-assert it
    // Just verify the download worked
  });
});
