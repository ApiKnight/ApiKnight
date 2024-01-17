import { test, expect } from '@playwright/test'
import { testEnv } from './test.env'

test.describe('test login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testEnv)
    const startBtn = page.getByRole('button', { name: '开始使用' })
    await startBtn.click()
  })
  test('Validate login', async ({ page }) => {
    const title = page.getByRole('heading', { name: 'Sign In' })
    await expect(title).toBeVisible()
    await page
      .getByRole('textbox', { name: '邮箱/手机号/用户名' })
      .fill('2281487673@qq.com')
    await page.getByTestId("sign-in-password").fill('123456')
    const loginBtn = page.getByTestId("signIn");
    await Promise.all([
      loginBtn.click(),
      page.waitForNavigation({ waitUntil: 'networkidle' }),
    ])
    expect(page.url()).not.toContain('/user/login')
  })
  test('Validate sign up', async ({ page }) => {
    const changeSignUpBtn = page.locator("id=sign-up");
    await changeSignUpBtn.click();
    await expect(page.getByRole("heading",{name: "welcome back!"})).toBeVisible();
    await page.getByTestId("sign-up-username").fill("test");
    await page.getByTestId("sign-up-password").fill('123456');
    await page.getByTestId("sign-up-email").fill("test@example.com");
    await page.getByTestId("sign-up-phone").fill("15542345526");
    await page.locator("id=sign-in").click();
    const title = page.getByRole('heading', { name: 'Sign In' })
    await expect(title).toBeVisible()
  })
})
