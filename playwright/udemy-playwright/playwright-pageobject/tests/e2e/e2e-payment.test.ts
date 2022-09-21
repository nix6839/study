import { test } from '@playwright/test';
import { HomePage, LoginPage, Navbar, PaymentPage } from '../../pom/index.js';

test.describe('New payment', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    paymentPage = new PaymentPage(page);

    // await page.goto('http://zero.webappsecurity.com/login.html');
    // await page.type('#user_login', 'username');
    // await page.type('#user_password', 'password');
    // await page.click('text=Sign in');
    await homePage.visit();
    await homePage.clickSignIn();
    await loginPage.login('username', 'password');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  });

  test('Should send new payment', async () => {
    // await page.locator('#pay_bills_tab').click();
    await navbar.clickTab('payBills');

    // await page.locator('#sp_payee').selectOption('apple');
    // await page.locator('#sp_get_payee_details').click();
    // await page.locator('#sp_payee_details').waitFor();
    // await page.locator('#sp_account').selectOption('6');
    // await page.locator('#sp_amount').type('5000');
    // await page.locator('#sp_date').type('2021-11-09');
    // await page.locator('#sp_description').type('some random message');
    // await page.locator('#pay_saved_payees').click();
    // const message = page.locator('#alert_content > span');
    // await expect(message).toBeVisible();
    // await expect(message).toHaveText('The payment was successfully submitted.');
    await paymentPage.createPayment();
    await paymentPage.assertSuccessMessage();
  });
});
