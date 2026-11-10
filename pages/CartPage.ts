import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Checkout buttons across different layouts
    this.proceedToCheckoutButton = page.locator('input[name="proceedToRetailCheckout"], #sc-buy-box-ptc-button, [data-feature-id="proceed-to-checkout-action"] input');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.amazon.com/gp/cart/view.html', { waitUntil: 'domcontentloaded' });
  }

  async proceedToCheckout(): Promise<void> {
    await expect(this.proceedToCheckoutButton.first()).toBeVisible({ timeout: 15000 });
    await this.proceedToCheckoutButton.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}