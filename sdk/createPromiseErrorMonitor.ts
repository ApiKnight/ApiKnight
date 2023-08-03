import { reportError } from './reportError'

export function createPromiseErrorMonitor(url?: string) {
  const name = 'promise'

  function handlePromiseError(event: any) {
    reportError({ name, data: event.reason }, `${url}`)
  }

  function start() {
    window.addEventListener('unhandledrejection', handlePromiseError)
  }

  function stop() {
    window.removeEventListener('unhandledrejection', handlePromiseError)
  }

  return { start, stop }
}
