import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Add to Cart button locators
    this.addToCartButton = page.locator('#add-to-cart-button, input#add-to-cart-button, #add-to-cart-button-ubb');
  }

  async addToCart(): Promise<void> {
    await expect(this.addToCartButton.first()).toBeVisible({ timeout: 15000 });
    await this.addToCartButton.first().click();
    // Wait for the DOM to settle after adding to cart
    await this.page.waitForLoadState('domcontentloaded');
  }
}