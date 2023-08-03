import { reportError } from './reportError'
/* 
  采集JS错误的monitor
*/
export function createJsErrorMonitor(url?: string) {
  const name = 'js-error'
  if (url === '' || url === undefined) {
    url = `url is ${window.location.pathname}:`
  }
  function start() {
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)
  }
  /* eslint-disable */
  function handleError(e: any) {
    if (e.error) {
      const { type, message } = e
      const { filename, lineno, colno } = e

      reportError(
        { name, data: { type, message, filename, lineno, colno } },
        `JS error(url is ${url}):`,
      )
    }
  }

  function handleRejection(e: any) {
    const { type, reason } = e

    reportError({ name, data: { type, reason } }, 'JS error:')
  }

  return { name, start }
}
