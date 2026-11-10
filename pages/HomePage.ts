import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly navCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchSubmitButton = page.locator('#nav-search-submit-button');
    this.navCartButton = page.locator('#nav-cart');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    // Handle captcha if it appears
    const captchaHeader = this.page.locator('h4:has-text("Enter the characters you see below")');
    if (await captchaHeader.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.warn('Amazon Captcha encountered - running in defensive fallback mode.');
    }
  }

  async searchForProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchSubmitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}