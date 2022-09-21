import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class ShowTransactionPage {
  readonly #page: Page;

  readonly #accountSelectBox: Locator;
  readonly #transactionList: Locator;
  readonly #noResults: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#accountSelectBox = this.#page.locator('#aa_accountId');
    this.#transactionList = this.#page.locator(
      '#all_transactions_for_account tbody > tr',
    );
    this.#noResults = page.locator('#all_transactions_for_account > .well');
  }

  async selectAccount(accountId: string) {
    await this.#accountSelectBox.selectOption(accountId);
  }

  async assertTransactionsCount(count: number) {
    await expect(this.#transactionList).toHaveCount(count);
  }

  async assertTransactionIsEmpty() {
    await expect(this.#noResults).toBeVisible();
  }
}
