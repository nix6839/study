import { test } from '@playwright/test';
import { HomePage, LoginPage } from '../../pom/index.js';

test.describe.parallel('Login page visual tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.clickSignIn();
  });

  test('Login form', async () => {
    await loginPage.snapshotLoginForm();
  });

  test('Login error message', async () => {
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.snapshotErrorMessage();
  });
});
