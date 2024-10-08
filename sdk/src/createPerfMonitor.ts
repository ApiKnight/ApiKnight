/**
 * 列举出性能指标对应的 entry type
 * fp,fcp --> paint
 * lcp --> largest-contentful-paint
 * fip --> first-input
 */

import { reportError } from './reportError'
// 3. 封装成一个 monitor
export function createPerfMonitor(adress: string) {
  return function (url?: string) {
    const name = 'performance'
    const report = reportError(adress)
    if (url === '' || url === undefined) {
      url = window.location.pathname
    }
    const entryTypes = ['paint', 'largest-contentful-paint', 'first-input']
    function start() {
      const p = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          report({ name, data: entry }, url as string, name)
        }
      })
      p.observe({ entryTypes })
    }
    return { name, start }
  }
}
