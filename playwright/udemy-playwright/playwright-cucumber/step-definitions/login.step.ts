import { BeforeStep, Given, Then, When } from '@cucumber/cucumber';
import { LoginPage } from '../pom/index.js';
import { ThisInfo } from '../setup/types.js';

let loginPage: LoginPage;

BeforeStep(function (this: ThisInfo) {
  loginPage = new LoginPage(this.page);
});

Given('I visit a login page', async function () {
  // await this.page.goto('https://www.saucedemo.com/');
  await loginPage.visit();
});

When('I fill the login form with valid credentials', async function () {
  // await page.fill('#user-name', 'standard_user');
  // await page.fill('#password', 'secret_sauce');
  // await page.click('#login-button');
  await loginPage.submitLoginForm();
});

Then('I should see the home page', async function () {
  // expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  await loginPage.assertUserIsLoggedIn();
});

When(
  /^I fill the login form with '([^"]*)' and '([^"]*)'$/,
  async function (username: string, password: string) {
    await loginPage.submitLoginWithParameters(username, password);
  },
);

Then('I wait for 3 seconds', async function () {
  await loginPage.pause();
});
