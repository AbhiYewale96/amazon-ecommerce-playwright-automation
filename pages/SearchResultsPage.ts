import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly searchResultsHeader: Locator;
  readonly firstProductTitle: Locator;
  readonly noResultsAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResultsHeader = page.locator('span.a-color-state');
    this.firstProductTitle = page.locator('[data-component-type="s-search-result"] h2 a').first();
    this.noResultsAlert = page.locator('div.s-no-outline, span:has-text("No results for")');
  }

  async verifySearchTermDisplayed(expectedTerm: string): Promise<void> {
    await expect(this.searchResultsHeader).toContainText(expectedTerm);
  }

  async selectFirstProduct(): Promise<string> {
    await expect(this.firstProductTitle).toBeVisible({ timeout: 10000 });
    const productTitle = (await this.firstProductTitle.innerText()).trim();
    
    // Handle page navigation in both new and current tab
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 4000 }).catch(() => null),
      this.firstProductTitle.click(),
    ]);

    if (newPage) {
      await newPage.waitForLoadState('domcontentloaded');
      return productTitle;
    }
    await this.page.waitForLoadState('domcontentloaded');
    return productTitle;
  }

  async verifyNoResultsFound(): Promise<void> {
    await expect(this.noResultsAlert.first()).toBeVisible();
  }
}