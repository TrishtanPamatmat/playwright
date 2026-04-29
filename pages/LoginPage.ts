import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly messageBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    // We define the selectors here in ONE place
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.messageBanner = page.locator('#flash');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async submitLogin(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}