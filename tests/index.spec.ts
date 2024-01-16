import { test, expect } from '@playwright/test';

test.describe("Index Page",() => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4173/ApiKnight');
  })
  test('has title', async ({ page }) => { 
    const hName1 = page.getByRole("heading",{name: "API 文档、API 调试、API Mock、API 自动导入"});
    await expect(hName1).toBeVisible();
    const hName2 = page.getByRole("heading",{name: "API 一体化协作平台"});
    await expect(hName2).toBeVisible();
    const hName3 = page.getByRole('heading',{name: "一套系统、一份数据，解决多个 API 工具之间的数据同步问题"});
    await expect(hName3).toBeVisible();
    const hNameList1 = page.getByRole('heading',{name: "可视化 API 设计"});
    await expect(hNameList1).toBeVisible();
    const hNameList2 = page.getByRole("heading",{name: "比 Postman 更强大"});
    await expect(hNameList2).toBeVisible();
    const hNameList3 = page.getByRole("heading",{name: "分享&发布 API 文档"});
    await expect(hNameList3).toBeVisible();
    const hNameList4 = page.getByRole("heading",{name: "零配置 Mock 数据"});
    await expect(hNameList4).toBeVisible();
  });
  
  test('get started btn', async ({ page }) => {
    const startButton = page.getByRole("button",{name: "开始使用"});
    await expect(startButton).toBeVisible();
  });
})
