import { userAuthMap } from '../user-auth'
import { LoginWay } from '../user-auth-types'
import type { Page } from '@playwright/test'

async function loginTestFunc(loginWay: LoginWay, page: Page): Promise<void> {
  const user = userAuthMap[loginWay]
  await page
    .getByRole('textbox', { name: '邮箱/手机号/用户名' })
    .fill(String(user.username))
  await page.getByTestId('sign-in-password').fill(user.password)
  const loginBtn = page.getByTestId('signIn')
  await Promise.all([
    loginBtn.click(),
    page.waitForNavigation(),
  ])
  await page.waitForTimeout(1200);
}

export default loginTestFunc
