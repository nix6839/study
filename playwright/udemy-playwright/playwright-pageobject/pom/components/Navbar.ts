import type { Locator, Page } from '@playwright/test';

export type NavbarTab =
  | 'accountSummary'
  | 'accountActivity'
  | 'transferFunds'
  | 'payBills'
  | 'myMoneyApp'
  | 'onlineStatements';

export default class Navbar {
  readonly #page: Page;

  readonly #tab: Record<NavbarTab, Locator>;

  constructor(page: Page) {
    this.#page = page;

    this.#tab = {
      accountSummary: this.#page.locator('#account_summary_tab'),
      accountActivity: this.#page.locator('#account_activity_tab'),
      transferFunds: this.#page.locator('#transfer_funds_tab'),
      payBills: this.#page.locator('#pay_bills_tab'),
      myMoneyApp: this.#page.locator('#money_map_tab'),
      onlineStatements: this.#page.locator('#online-statements_tab'),
    };
  }

  async clickTab(tabName: NavbarTab) {
    await this.#tab[tabName].click();
  }
}
