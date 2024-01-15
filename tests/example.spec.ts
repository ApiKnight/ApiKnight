import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://polaris.lyyfsq.club/');
  const hName1 = page.getByRole("heading",{name: "API 文档、API 调试、API Mock、API 自动导入"});
  await expect(hName1).toBeVisible();
  const hName2 = page.getByRole("heading",{name: "API 一体化协作平台"});
  await expect(hName2).toBeVisible();
  const startButton = page.getByRole("button",{name: "开始使用"});
  await expect(startButton).toBeVisible();
});

// test('get started link', async ({ page }) => {
//   await page.goto('http://polaris.lyyfsq.club/');

//   // Click the get started link.
//   await page.getByRole('button', { name: '开始使用' }).click();

//   // Expects page to have a heading with the name of Installation.
//   // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
//   expect(page).toHaveTitle(/Hello Friend!/);
// });
