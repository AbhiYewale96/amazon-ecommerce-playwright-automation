import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test.describe('Amazon E-Commerce Core - Search & Discovery Flow', () => {
  test('TC01 - Validate positive search term returns relevant catalog results', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.navigate();
    await home.searchForProduct('wireless mouse');
    await results.verifySearchTermDisplayed('wireless mouse');
  });

  test('TC02 - Defensive validation for non-existent keyword (Negative flow)', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.navigate();
    await home.searchForProduct('zyxwv1029384756randomjunk');
    await results.verifyNoResultsFound();
  });
});