import { expect } from 'expect';

export default class LoginPage {
  async visit() {
    await page.goto('https://www.saucedemo.com/');
  }

  async submitLoginForm() {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  }

  async submitLoginWithParameters(username: string, password: string) {
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
  }

  async assertUserIsLoggedIn() {
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  }

  async pause() {
    await page.waitForTimeout(3000);
  }
}
