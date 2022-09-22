import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class TransferFundsPage {
  readonly #page: Page;

  readonly #fromAccountSelectBox: Locator;
  readonly #toAccountSelectBox: Locator;
  readonly #amountInput: Locator;
  readonly #descriptionInput: Locator;
  readonly #submitButton: Locator;

  readonly #boardHeader: Locator;

  readonly #message: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#fromAccountSelectBox = this.#page.locator('#tf_fromAccountId');
    this.#toAccountSelectBox = this.#page.locator('#tf_toAccountId');
    this.#amountInput = this.#page.locator('#tf_amount');
    this.#descriptionInput = this.#page.locator('#tf_description');
    this.#submitButton = this.#page.locator('#btn_submit');

    this.#boardHeader = this.#page.locator('h2.board-header');

    this.#message = this.#page.locator('.alert-success');
  }

  async transferFund() {
    await this.#fromAccountSelectBox.selectOption('2');
    await this.#toAccountSelectBox.selectOption('3');
    await this.#amountInput.type('500');
    await this.#descriptionInput.type('Test message');
    await this.#submitButton.click();
    await expect(this.#boardHeader).toContainText('Verify');
    await this.#submitButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.#message).toContainText(
      'You successfully submitted your transaction',
    );
  }
}
