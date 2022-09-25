import { BrowserContext, Page } from 'playwright';

export interface ThisInfo {
  context: BrowserContext;
  page: Page;
}
