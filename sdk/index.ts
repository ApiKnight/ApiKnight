import { createBlankScreenMonitor } from './createBlankScreenMonitor'
import { createJsErrorMonitor } from './createJsErrorMonitor'
import { createPerfMonitor } from './createPerfMonitor'
import { createResourceErrorMonitor } from './createResourceErrorMonitor'
import { createXhrMonitor } from './createXhrMonitor'
import { createPromiseErrorMonitor } from './createPromiseErrorMonitor'

export function createAllMonitor(url?: string) {
  const name = 'AllMonitor'
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  function start() {
    createBlankScreenMonitor(url).start()
    createJsErrorMonitor(url).start()
    createPerfMonitor(url).start()
    createResourceErrorMonitor(url).start()
    // createXhrMonitor(url).start()
    createPromiseErrorMonitor(url).start()
  }
  return { name, start }
}
