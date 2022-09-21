import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import AbstractPage from './AbstractPage.js';

export default class LoginPage extends AbstractPage {
  // private readonly page: Page;
  readonly #usernameInput: Locator;
  readonly #passwordInput: Locator;
  readonly #submitButton: Locator;
  readonly #errorMessage: Locator;

  constructor(page: Page) {
    // this.page = page;
    super(page);

    this.#usernameInput = this.page.locator('#user_login');
    this.#passwordInput = this.page.locator('#user_password');
    this.#submitButton = this.page.locator('text=Sign in');
    this.#errorMessage = this.page.locator('.alert-error');
  }

  async login(username: string, password: string) {
    await this.#usernameInput.type(username);
    await this.#passwordInput.type(password);
    await this.#submitButton.click();
  }

  async assertErrorMessage() {
    await expect(this.#errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  }
}
