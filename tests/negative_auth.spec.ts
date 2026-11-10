import { test } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';

test.describe('Amazon Security & Defensive Testing - Authentication Safeguards', () => {
  test('TC04 - Input validation failure on empty/malformed credentials', async ({ page }) => {
    const signIn = new SignInPage(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('#nav-link-accountList').click();

    await signIn.verifyOnSignInPage();
    
    // Trigger validation error by attempting to continue without credentials
    await signIn.submitEmptyCredential();
    await signIn.verifyErrorMessage();
  });
});