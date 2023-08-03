/**
 * 列举出性能指标对应的 entry type
 * fp,fcp --> paint
 * lcp --> largest-contentful-paint
 * fip --> first-input
 */
import { reportError } from './reportError'
// 3. 封装成一个 monitor
export function createPerfMonitor(url?: string) {
  const name = 'performance'
  if (url === '' || url === undefined) {
    url = `url is ${window.location.pathname}:`
  }
  const entryTypes = ['paint', 'largest-contentful-paint', 'first-input']
  function start() {
    const p = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportError({ name, data: entry }, `Performance index(${url}):`)
      }
    })
    p.observe({ entryTypes })
  }
  return { name, start }
}
