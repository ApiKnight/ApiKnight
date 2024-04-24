import { createBlankScreenMonitor } from './createBlankScreenMonitor'
import { createJsErrorMonitor } from './createJsErrorMonitor'
import { createPerfMonitor } from './createPerfMonitor'
import { createResourceErrorMonitor } from './createResourceErrorMonitor'
import { createPromiseErrorMonitor } from './createPromiseErrorMonitor'
import { reportError } from './reportError'

export function Monitor(reportAdress: string) {
  const blankScreenMonitor = createBlankScreenMonitor(reportAdress)
  const jsErrorMonitor = createJsErrorMonitor(reportAdress)
  const perfMonitor = createPerfMonitor(reportAdress)
  const resourceErrorMonitor = createResourceErrorMonitor(reportAdress)
  const promiseErrorMonitor = createPromiseErrorMonitor(reportAdress)
  function createAllMonitor(url?: string) {
    const name = 'AllMonitor'
    if (url === '' || url === undefined) {
      url = window.location.pathname
    }
    function start() {
      blankScreenMonitor(url).start()
      jsErrorMonitor(url).start()
      perfMonitor(url).start()
      resourceErrorMonitor(url).start()
      promiseErrorMonitor(url).start()
    }

    return { name, start }
  }
  const report = reportError(reportAdress)
  return {
    createAllMonitor,
    report,
    blankScreenMonitor,
    jsErrorMonitor,
    perfMonitor,
    resourceErrorMonitor,
    promiseErrorMonitor,
  }
}
