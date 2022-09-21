import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class PaymentPage {
  readonly #page: Page;

  readonly #payeeSelectBox: Locator;
  readonly #accountSelectBox: Locator;
  readonly #amountInput: Locator;
  readonly #dateInput: Locator;
  readonly #descriptionInput: Locator;
  readonly #submitPaymentButton: Locator;

  readonly #payeeDetailButton: Locator;
  readonly #payeeDetail: Locator;

  readonly #message: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#payeeSelectBox = this.#page.locator('#sp_payee');
    this.#accountSelectBox = this.#page.locator('#sp_account');
    this.#amountInput = this.#page.locator('#sp_amount');
    this.#dateInput = this.#page.locator('#sp_date');
    this.#descriptionInput = this.#page.locator('#sp_description');
    this.#submitPaymentButton = this.#page.locator('#pay_saved_payees');

    this.#payeeDetailButton = this.#page.locator('#sp_get_payee_details');
    this.#payeeDetail = this.#page.locator('#sp_payee_details');

    this.#message = this.#page.locator('#alert_content > span');
  }

  async createPayment() {
    await this.#payeeSelectBox.selectOption('apple');

    await this.#payeeDetailButton.click();
    await expect(this.#payeeDetail).toBeVisible();

    await this.#accountSelectBox.selectOption('6');
    await this.#amountInput.type('5000');
    await this.#dateInput.type('2021-11-09');
    await this.#descriptionInput.type('some random message');
    await this.#submitPaymentButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.#message).toBeVisible();
    await expect(this.#message).toHaveText(
      'The payment was successfully submitted.',
    );
  }
}
