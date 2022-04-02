import { test, expect, selectors } from '@playwright/test';
import createAriaEngine from '../dist';

test('Aria engine works', async ({ page }) => {
  // Register the engine
  await selectors.register('aria', createAriaEngine, { contentScript: false });

  // Open test HTML file
  await page.goto(`file://${__dirname}/index.html`);

  // Run some tests
  await expect(page.locator('aria=button(/test button/)')).toBeVisible();
  expect(await page.locator('aria=button').count()).toBe(2);
});
