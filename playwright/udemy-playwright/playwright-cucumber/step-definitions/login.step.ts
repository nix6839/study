import { BeforeStep, Given, Then, When } from '@cucumber/cucumber';
import { LoginPage } from '../pom/index.js';

let loginPage: LoginPage;

BeforeStep(() => {
  loginPage = new LoginPage();
});

Given('I visit a login page', async () => {
  await page.goto('https://www.saucedemo.com/');
  await loginPage.visit();
});

When('I fill the login form with valid credentials', async () => {
  // await page.fill('#user-name', 'standard_user');
  // await page.fill('#password', 'secret_sauce');
  // await page.click('#login-button');
  await loginPage.submitLoginForm();
});

Then('I should see the home page', async () => {
  // expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  await loginPage.assertUserIsLoggedIn();
});

When(
  /^I fill the login form with '([^"]*)' and '([^"]*)'$/,
  async (username: string, password: string) => {
    await loginPage.submitLoginWithParameters(username, password);
  },
);

Then('I wait for 3 seconds', async () => {
  await loginPage.pause();
});
