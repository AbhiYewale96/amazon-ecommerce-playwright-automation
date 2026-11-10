import { Page, Locator, expect } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly emailOrPhoneInput: Locator;
  readonly continueButton: Locator;
  readonly alertBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailOrPhoneInput = page.locator('#ap_email, input[name="email"]');
    this.continueButton = page.locator('#continue, input#continue');
    // Targets error containers for invalid input or missing required credentials
    this.alertBox = page.locator('#auth-error-message-box, #auth-email-missing-alert, .a-alert-content');
  }

  async verifyOnSignInPage(): Promise<void> {
    await expect(this.emailOrPhoneInput.first()).toBeVisible({ timeout: 15000 });
  }

  async submitCredential(value: string): Promise<void> {
    const input = this.emailOrPhoneInput.first();
    await input.click();
    // Type with small delay like a real user
    await input.pressSequentially(value, { delay: 50 });
    await this.continueButton.first().click();
  }

  async submitEmptyCredential(): Promise<void> {
   // Attempt form submission with empty fields to trigger client-side validation
    await this.continueButton.first().click();
  }

  async verifyErrorMessage(): Promise<void> {
    await expect(this.alertBox.first()).toBeVisible({ timeout: 10000 });
  }
}