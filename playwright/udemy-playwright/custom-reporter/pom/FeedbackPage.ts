import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export interface FeedbackForm {
  name: string;
  email: string;
  subject: string;
  comment: string;
}

export default class FeedbackPage {
  readonly #page: Page;

  readonly #feedbackTitle: Locator;

  readonly #nameInput: Locator;
  readonly #emailInput: Locator;
  readonly #subjectInput: Locator;
  readonly #commentInput: Locator;

  readonly #clearButton: Locator;
  readonly #submitButton: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#feedbackTitle = this.#page.locator('#feedback-title');

    this.#nameInput = this.#page.locator('#name');
    this.#emailInput = this.#page.locator('#email');
    this.#subjectInput = this.#page.locator('#subject');
    this.#commentInput = this.#page.locator('#comment');

    this.#clearButton = this.#page.locator('input[name="clear"]');
    this.#submitButton = this.#page.locator('input[type="submit"]');
  }

  async fillForm(input: FeedbackForm) {
    const { name, email, subject, comment } = input;

    await this.#nameInput.type(name);
    await this.#emailInput.type(email);
    await this.#subjectInput.type(subject);
    await this.#commentInput.type(comment);
  }

  async resetForm() {
    await this.#clearButton.click();
  }

  async submitForm() {
    await this.#submitButton.click();
  }

  async assertReset() {
    await expect(this.#nameInput).toBeEmpty();
    await expect(this.#emailInput).toBeEmpty();
    await expect(this.#subjectInput).toBeEmpty();
    await expect(this.#commentInput).toBeEmpty();
  }

  async feedbackFormSent() {
    await expect(this.#feedbackTitle).toBeVisible();
  }
}
