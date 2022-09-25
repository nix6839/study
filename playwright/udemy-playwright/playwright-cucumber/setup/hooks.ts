import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import { ThisInfo } from './types.js';

let browser: playwright.Browser;

BeforeAll(async function (this: ThisInfo) {
  console.log('Launch browser');
  browser = await playwright.chromium.launch({ headless: false });
});

AfterAll(async function (this: ThisInfo) {
  console.log('Close browser');
  await browser.close();
});

Before(async function (this: ThisInfo) {
  console.log('Create new context and page');
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: ThisInfo) {
  console.log('Close context and page');
  await this.page.close();
  await this.context.close();
});
