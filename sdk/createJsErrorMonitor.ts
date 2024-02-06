import { reportError } from './reportError'
import { UnhandledRejectionData, JsErrorData } from './type'

/* 
  采集JS错误的 monitor
*/

export function createJsErrorMonitor(url?: string) {
  const name = 'js-error'

  if (!url) {
    url = window.location.pathname
  }

  function start() {
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)
  }

  function handleError(e: ErrorEvent) {
    const { error, type } = e

    if (error) {
      const { message, filename, lineno, colno } = error

      const jsErrorData: JsErrorData = {
        type,
        message: message || '',
        filename: filename || '',
        lineno: lineno || 0,
        colno: colno || 0,
      }

      reportError({ name, data: jsErrorData }, url, name)
    }
  }

  function handleRejection(e: PromiseRejectionEvent) {
    const { type, reason } = e

    const rejectionData: UnhandledRejectionData = { type, reason }

    reportError({ name, data: rejectionData }, url, name)
  }

  return { name, start }
}
