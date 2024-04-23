import { reportError } from './reportError'

export function createPromiseErrorMonitor(adress: string) {
  return function (url?: string) {
    const resport = reportError(adress)
    const name = 'promise'
    if (url === '' || url === undefined) {
      url = window.location.pathname
    }
    // eslint-disable-next-line
    function handlePromiseError(event: any) {
      resport({ name, data: event.reason }, url as string, name)
    }

    function start() {
      window.addEventListener('unhandledrejection', handlePromiseError)
    }

    function stop() {
      window.removeEventListener('unhandledrejection', handlePromiseError)
    }

    return { start, stop }
  }
}
