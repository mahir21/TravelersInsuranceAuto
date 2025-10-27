import { test, expect } from '@playwright/test';
import { HomePage } from '../../HomePage';

test('Travelers - Auto Insurance Quote from home page', async ({ page }) => {
  const home = new HomePage(page);

  // Step 1: Go to home page
  await home.goto();

  // Step 2: Select Auto Insurance and fill ZIP code
  await home.selectAutoInsurance();

  // Step 3: Verify we landed on the quote form or next page
  await expect(page).toHaveURL(/quote|auto-insurance/);

  // Optional: check that we're on a page related to auto insurance
  await expect(page.locator('body')).toContainText(/auto|insurance|quote/i);
});
