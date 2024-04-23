import { reportError } from './reportError'

// 采集静态资源错误的monitor
export function createResourceErrorMonitor(url?: string) {
  const name = 'resource-error'
  if (url === '' || url === undefined) {
    url = `url is ${window.location.pathname}:`
  }
  function start() {
    window.addEventListener(
      'error',
      (e) => {
        // 注意区分 js error
        const target = e.target || e.srcElement
        if (!target) {
          return
        }
        if (target instanceof HTMLElement) {
          let url: string | null
          // 区分 link 标签，获取静态资源地址
          if (target.tagName.toLowerCase() === 'link') {
            url = target.getAttribute('href')
          } else {
            url = target.getAttribute('src')
          }
          reportError({ name, data: { url } }, url as string, name)
        }
      },
      true,
    )
  }
  return { name, start }
}
