import * as fs from 'node:fs';
import * as playwright from 'playwright';
import * as randomUserAgent from 'random-useragent';

const BASE_URL = 'https://github.com/topics/playwright';

try {
  // Setup browser
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({
    bypassCSP: true,
    userAgent: randomUserAgent.getRandom(),
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(BASE_URL);

  // Get data from website
  // const repositories = await page.$$eval('article.border', (repoCards) =>
  //   repoCards.map((card) => {
  //     const [user, repo] = card.querySelectorAll<HTMLAnchorElement>('h3 a');
  //     return {
  //       user: formatText(user),
  //       repo: formatText(repo),
  //       url: repo.href,
  //     };

  //     function formatText(element: HTMLElement) {
  //       return element.innerText.trim();
  //     }
  //   }),
  // );
  const repositories = await page
    .locator('article.border')
    .evaluateAll((repoCards) =>
      repoCards.map((repoCard) => {
        const [user, repo] =
          repoCard.querySelectorAll<HTMLAnchorElement>('h3 a');
        return {
          user: formatText(user),
          repo: formatText(repo),
          url: repo.href,
        };

        function formatText(element: HTMLElement) {
          return element.innerText.trim();
        }
      }),
    );

  // Store date into file
  fs.writeFileSync('data.json', JSON.stringify(repositories, null, 2));

  // Close browser
  await browser.close();
} catch (error) {
  console.log(error);
  process.exit(1);
}
