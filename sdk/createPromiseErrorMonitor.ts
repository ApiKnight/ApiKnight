import { reportError } from './reportError'

export function createPromiseErrorMonitor(url?: string) {
  const name = 'promise'
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  function handlePromiseError(event: any) {
    reportError({ name, data: event.reason }, url, name)
  }

  function start() {
    window.addEventListener('unhandledrejection', handlePromiseError)
  }

  function stop() {
    window.removeEventListener('unhandledrejection', handlePromiseError)
  }

  return { start, stop }
}
