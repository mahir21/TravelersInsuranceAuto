import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.travelers.com/');
  }

  async selectAutoInsurance() {
    // Wait for and select insurance type dropdown
    await this.page.waitForSelector('#miniform-select-5312', { timeout: 10000 });
    await this.page.selectOption('#miniform-select-5312', { label: 'Auto' });

    // Wait for the ZIP code field to appear after selecting Auto
    await this.page.waitForTimeout(2000);

    // The ZIP code fields have dynamic IDs that start with 'zip-code-single'
    // Find the first visible one that matches this pattern
    const zipField = this.page.locator('input[id^="zip-code-single"]').first();
    await zipField.waitFor({ timeout: 5000 });
    await zipField.fill('06094');

    // Debug: Look for all buttons on the page
    const buttons = await this.page.locator('button, input[type="submit"], input[type="button"]').all();
    console.log(`Found ${buttons.length} buttons/inputs`);
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const value = await buttons[i].getAttribute('value');
      const type = await buttons[i].getAttribute('type');
      console.log(`Button ${i}: text="${text}", value="${value}", type="${type}"`);
    }

    // Try different button selectors
    let quoteButton = null;
    const buttonSelectors = [
      'button:has-text("Get a Quote")',
      'button:has-text("Get Quote")',
      'input[value*="Quote"]',
      'button:has-text("Quote")',
      '[type="submit"]'
    ];
    
    for (const selector of buttonSelectors) {
      try {
        quoteButton = this.page.locator(selector).first();
        await quoteButton.waitFor({ timeout: 2000 });
        console.log(`Found button with selector: ${selector}`);
        break;
      } catch (e) {
        console.log(`Button selector ${selector} not found`);
      }
    }
    
    if (quoteButton) {
      await quoteButton.click();
      console.log('Successfully clicked quote button');
    } else {
      throw new Error('Could not find Get Quote button');
    }

    // Wait for the next page to load
    await this.page.waitForLoadState('networkidle');
  }
}
