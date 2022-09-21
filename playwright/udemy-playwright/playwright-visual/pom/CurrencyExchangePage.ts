import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export default class CurrencyExchangePage {
  readonly #page: Page;

  readonly #currencySelectBox: Locator;
  readonly #amountInput: Locator;
  readonly #dollarRadioButton: Locator;
  readonly #calculateCostsButton: Locator;
  readonly #submitPurchaseButton: Locator;

  readonly #sellRate: Locator;

  readonly #conversionAmount: Locator;

  readonly #purchasedAlert: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#currencySelectBox = this.#page.locator('#pc_currency');
    this.#amountInput = this.#page.locator('#pc_amount');
    this.#dollarRadioButton = this.#page.locator('#pc_inDollars_true');
    this.#calculateCostsButton = this.#page.locator('#pc_calculate_costs');
    this.#submitPurchaseButton = this.#page.locator('#purchase_cash');

    this.#sellRate = this.#page.locator('#sp_sell_rate');

    this.#conversionAmount = this.#page.locator('#pc_conversion_amount');

    this.#purchasedAlert = this.#page.locator('#alert_content');
  }

  async purchaseCash() {
    await this.#currencySelectBox.selectOption('EUR');
    await expect(this.#sellRate).toContainText('1 euro (EUR)');

    await this.#amountInput.type('500');
    await this.#dollarRadioButton.click();
    await this.#calculateCostsButton.click();
    await expect(this.#conversionAmount).toContainText(
      '500.00 U.S. dollar (USD)',
    );

    await this.#submitPurchaseButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.#purchasedAlert).toBeVisible();
    await expect(this.#purchasedAlert).toHaveText(
      'Foreign currency cash was successfully purchased.',
    );
  }
}
