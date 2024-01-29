import { test as base, expect, BrowserContext } from '@playwright/test'
import { testEnv } from './test.env'
import loginTestFunc from './test-utils/login'

// 定义全局变量用于存储 BrowserContext
let globalContext: BrowserContext | null

// 创建一个 base 测试实例并扩展 page 对象，使其使用全局的 BrowserContext
const test = base.extend<{
  context: BrowserContext
}>({
  // 配置全局的 BrowserContext fixture
  context: async ({ browser }, use) => {
    // 如果 context 未定义，则创建新的 context 用于测试
    if (!globalContext) {
      globalContext = await browser.newContext()
      await use(globalContext)
      // 测试全部完成后关闭 context
      await globalContext.close()
      globalContext = null
    } else {
      await use(globalContext)
    }
  },
  // 扩展 page fixture 以使用上面定义的 context
  page: async ({ context }, use) => {
    // 使用 context 创建新的 page
    const page = await context.newPage()
    await use(page)
    // 测试结束后不关闭 page，因为 context 会在最后统一关闭
  },
})

// 使用扩展的 test 实例来运行测试
test.describe('User page', async () => {
  // 登录操作将在 beforeEach 钩子中完成，为每个测试设置好环境
  test.beforeEach(async ({ page }) => {
    await page.goto(`${testEnv}/user/login`)
    await loginTestFunc('defaultLogin', page)
  })

  // 定义测试用例
  test('User List', async ({ page }) => {
    await page.goto(`${testEnv}/user`)
    const title = page.getByRole('heading', { name: '我的项目' })
    await expect(title).toBeVisible()
    const addProject = page.getByRole('button', { name: '新建项目' })
    await addProject.click()
    const projectNameInput = page.locator('#basic_projectname')
    const projectDescInput = page.locator('#basic_description')
    await projectNameInput.fill('Test Project')
    await projectDescInput.fill('Test Project Desc')
    await page.getByRole('button', { name: '确 定' }).click()
    await expect(page.getByText('Test Project Desc')).toBeVisible()
    await page.getByText('Test Project Desc').hover()
    await expect(page.getByTestId('Test Project').nth(0)).toBeVisible()
    await page.getByTestId('Test Project').nth(0).click()
  })
})
