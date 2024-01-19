import { reportError } from './reportError'

/* 
  采集JS错误的 monitor
*/
interface JsErrorData {
  type: string
  message?: string
  filename?: string
  lineno?: number
  colno?: number
}

// Adjust the type of 'reason' based on your application's needs
interface UnhandledRejectionData {
  type: string
  reason: Error // Provide a more specific type for 'reason'
}

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
