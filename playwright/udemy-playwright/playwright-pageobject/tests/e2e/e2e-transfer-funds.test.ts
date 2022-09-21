import { test } from '@playwright/test';
import {
  HomePage,
  LoginPage,
  Navbar,
  TransferFundsPage,
} from '../../pom/index.js';

test.describe('Transfer funds and make payments', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let transferFundsPage: TransferFundsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    transferFundsPage = new TransferFundsPage(page);

    // await page.goto('http://zero.webappsecurity.com/index.html');
    // await page.click('#signin_button');
    // await page.type('#user_login', 'username');
    // await page.type('#user_password', 'password');
    // await page.click('text=Sign in');
    await homePage.visit();
    await homePage.clickSignIn();
    await loginPage.login('username', 'password');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Transfer funds', async () => {
    // await page.click('#transfer_funds_tab');
    // await page.selectOption('#tf_fromAccountId', '2');
    // await page.selectOption('#tf_toAccountId', '3');
    // await page.type('#tf_amount', '500');
    // await page.type('#tf_description', 'Test message');
    // await page.click('#btn_submit');

    // const boardHeader = page.locator('h2.board-header');
    // await expect(boardHeader).toContainText('Verify');
    // await page.click('#btn_submit');
    await navbar.clickTab('transferFunds');
    await transferFundsPage.transferFund();

    // const message = page.locator('.alert-success');
    // await expect(message).toContainText(
    //   'You successfully submitted your transaction',
    // );
    await transferFundsPage.assertSuccessMessage();
  });
});
