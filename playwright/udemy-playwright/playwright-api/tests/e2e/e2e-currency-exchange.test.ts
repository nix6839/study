import { test } from '@playwright/test';
import {
  CurrencyExchangePage,
  HomePage,
  LoginPage,
  Navbar,
  PayBillsPage,
} from '../../pom/index.js';

test.describe('Currency Exchange Form', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let payBillsPage: PayBillsPage;
  let currencyExchangePage: CurrencyExchangePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    payBillsPage = new PayBillsPage(page);
    currencyExchangePage = new CurrencyExchangePage(page);

    // await page.goto('http://zero.webappsecurity.com/login.html');
    // await page.locator('#user_login').type('username');
    // await page.locator('#user_password').type('password');
    // await page.locator('text=Sign in').click();
    await homePage.visit();
    await homePage.clickSignIn();
    await loginPage.login('username', 'password');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Should make currency exchange', async () => {
    // await page.locator('#pay_bills_tab').click();
    // await page.locator('a[href="#ui-tabs-3"]').click();
    await navbar.clickTab('payBills');
    payBillsPage.clickTab('currencyExchange');

    // await page.locator('#pc_currency').selectOption('EUR');
    // const sellRate = page.locator('#sp_sell_rate');
    // await expect(sellRate).toContainText('1 euro (EUR)');

    // await page.locator('#pc_amount').type('500');
    // await page.locator('#pc_inDollars_true').click();
    // await page.locator('#pc_calculate_costs').click();
    // const conversionAmount = page.locator('#pc_conversion_amount');
    // await expect(conversionAmount).toContainText('500.00 U.S. dollar (USD)');

    // await page.locator('#purchase_cash').click();
    await currencyExchangePage.purchaseCash();

    // const purchasedAlert = page.locator('#alert_content');
    // await expect(purchasedAlert).toBeVisible();
    // await expect(purchasedAlert).toHaveText(
    //   'Foreign currency cash was successfully purchased.',
    // );
    await currencyExchangePage.assertSuccessMessage();
  });
});
