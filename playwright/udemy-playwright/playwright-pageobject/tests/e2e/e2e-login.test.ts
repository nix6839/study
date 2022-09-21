import { expect, test } from '@playwright/test';
import { HomePage, LoginPage } from '../../pom/index.js';

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    // await page.goto('http://zero.webappsecurity.com');
    await homePage.visit();
  });

  test('Negative scenario for login', async () => {
    // await page.click('#signin_button');
    await homePage.clickSignIn();

    // await page.type('#user_login', 'invalid username');
    // await page.type('#user_password', 'invalid password');
    // await page.click('text=Sign in');
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.wait(3000);

    // const errorMessage = page.locator('.alert-error');
    // await expect(errorMessage).toContainText(
    //   'Login and/or password are wrong.',
    // );
    await loginPage.assertErrorMessage();
  });

  test('Positive scenario for login + logout', async ({ page }) => {
    // await page.click('#signin_button');
    await homePage.clickSignIn();

    // await page.type('#user_login', 'username');
    // await page.type('#user_password', 'password');
    // await page.click('text=Sign in');
    await loginPage.login('username', 'password');

    // This fixes HTTPS Error.
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');

    const accountSummaryTab = page.locator('#account_summary_tab');
    await expect(accountSummaryTab).toBeVisible();

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
