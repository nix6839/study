import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import AbstractPage from './AbstractPage.js';

export default class LoginPage extends AbstractPage {
  // private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly errorMessage: Locator;

  private readonly loginForm: Locator;

  constructor(page: Page) {
    // this.page = page;
    super(page);

    this.usernameInput = this.page.locator('#user_login');
    this.passwordInput = this.page.locator('#user_password');
    this.submitButton = this.page.locator('text=Sign in');
    this.errorMessage = this.page.locator('.alert-error');

    this.loginForm = this.page.locator('#login_form');
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  }

  async snapshotLoginForm() {
    expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png');
  }

  async snapshotErrorMessage() {
    expect(await this.errorMessage.screenshot()).toMatchSnapshot(
      'login-error.png',
    );
  }
}
