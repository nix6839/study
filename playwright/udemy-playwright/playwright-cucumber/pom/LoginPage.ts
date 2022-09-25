import { expect } from 'expect';
import { Page } from 'playwright';

export default class LoginPage {
  constructor(private readonly page: Page) {}

  async visit() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async submitLoginForm() {
    await this.page.fill('#user-name', 'standard_user');
    await this.page.fill('#password', 'secret_sauce');
    await this.page.click('#login-button');
  }

  async submitLoginWithParameters(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async assertUserIsLoggedIn() {
    expect(this.page.url()).toBe('https://www.saucedemo.com/inventory.html');
  }

  async pause() {
    await this.page.waitForTimeout(3000);
  }
}
