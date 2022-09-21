import { test } from '@playwright/test';
import {
  HomePage,
  LoginPage,
  Navbar,
  ShowTransactionPage,
} from '../../pom/index.js';

test.describe('Filter transactions', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let showTransactionPage: ShowTransactionPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    showTransactionPage = new ShowTransactionPage(page);

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

  test('Verify the results for each account', async () => {
    // await page.click('#account_activity_tab');
    await navbar.clickTab('accountActivity');

    // await page.selectOption('#aa_accountId', '2');
    // const checkingAccount = page.locator(
    //   '#all_transactions_for_account tbody > tr',
    // );
    // await expect(checkingAccount).toHaveCount(3);
    await showTransactionPage.selectAccount('2');
    await showTransactionPage.assertTransactionsCount(3);

    // await page.selectOption('#aa_accountId', '4');
    // const loanAccount = page.locator(
    //   '#all_transactions_for_account tbody > tr',
    // );
    // await expect(loanAccount).toHaveCount(2);
    await showTransactionPage.selectAccount('4');
    await showTransactionPage.assertTransactionsCount(2);

    // await page.selectOption('#aa_accountId', '6');
    // const noResults = page.locator('#all_transactions_for_account > .well');
    // await expect(noResults).toBeVisible();
    await showTransactionPage.selectAccount('6');
    await showTransactionPage.assertTransactionIsEmpty();
  });
});
