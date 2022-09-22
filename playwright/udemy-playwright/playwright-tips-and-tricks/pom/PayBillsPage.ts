import type { Locator, Page } from '@playwright/test';

export type PayBillsTab = 'payment' | 'newPayee' | 'currencyExchange';

export default class PayBillsPage {
  readonly #page: Page;

  readonly #tab: Record<PayBillsTab, Locator>;

  constructor(page: Page) {
    this.#page = page;

    this.#tab = {
      payment: this.#page.locator('a[href="#ui-tabs-1"]'),
      newPayee: this.#page.locator('a[href="#ui-tabs-2"]'),
      currencyExchange: this.#page.locator('a[href="#ui-tabs-3"]'),
    };
  }

  async clickTab(tab: PayBillsTab) {
    await this.#tab[tab].click();
  }
}
