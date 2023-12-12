import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://polaris.lyyfsq.club/');

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/ApiKnight/);
  //const locator = page.locator('.block_1--desc > p')
  await expect(page.locator('div.block_1--desc > p').nth(0)).toContainText('更先进的 API 设计/开发/测试工具')
});// a d c c d a a c b c c b a b a 
   // b d c c d a b b b d c a d a c
   // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15

// test('get started link', async ({ page }) => {
//   await page.goto('http://polaris.lyyfsq.club/');

//   // Click the get started link.
//   await page.getByRole('button', { name: '开始使用' }).click();

//   // Expects page to have a heading with the name of Installation.
//   // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
//   expect(page).toHaveTitle(/Hello Friend!/);
// });
