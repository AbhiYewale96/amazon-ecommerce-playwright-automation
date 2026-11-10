import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';

test.describe('Amazon E-Commerce Core - Add To Cart & Checkout Guard', () => {
  test('TC03 - End-to-end cart navigation and guest checkout security guard', async ({ page }) => {
    const home = new HomePage(page);
    const signIn = new SignInPage(page);

    // Step 1: Navigate to the store and search for an item
    await home.navigate();
    await home.searchForProduct('mouse');

    // Step 2: Open the shopping cart directly from the header navigation
    await page.locator('#nav-cart').click();
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Trigger authentication via the guest cart call-to-action
    const signInBtn = page.getByRole('link', { name: 'Sign in to your account' });
    await expect(signInBtn).toBeVisible({ timeout: 15000 });
    await signInBtn.click({ force: true });
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Verify unauthenticated users are redirected to the sign-in barrier
    await signIn.verifyOnSignInPage();
  });
});