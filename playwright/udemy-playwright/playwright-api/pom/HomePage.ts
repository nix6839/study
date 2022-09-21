import type { Locator, Page } from '@playwright/test';

export default class HomePage {
  readonly #page: Page;
  readonly #signInButton: Locator;
  readonly #searchBox: Locator;
  readonly #feedbackLink: Locator;

  constructor(page: Page) {
    this.#page = page;
    this.#signInButton = this.#page.locator('#signin_button');
    this.#searchBox = this.#page.locator('#searchTerm');
    this.#feedbackLink = this.#page.locator('#feedback');
  }

  async visit() {
    await this.#page.goto('http://zero.webappsecurity.com');
  }

  async clickSignIn() {
    await this.#signInButton.click();
  }

  async clickFeedbackLink() {
    await this.#feedbackLink.click();
  }

  async searchFor(query: string) {
    await this.#searchBox.type(query);
    await this.#page.keyboard.press('Enter');
  }
}
