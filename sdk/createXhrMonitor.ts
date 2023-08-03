import { reportError } from './reportError'

// 4, 封装成一个 monitor
export function createXhrMonitor(url?: string) {
  const name = 'xhr-error'
  if (url === '' || url === undefined) {
    url = `url is ${window.location.pathname}:`
  }
  function hookMethod(obj: any, key: string, hookFunc: Function) {
    return (...params: any[]) => {
      obj[key] = hookFunc(obj[key], ...params)
    }
  }
  function start() {
    hookMethod(
      XMLHttpRequest.prototype,
      'open',
      (origin: Function) =>
        function (this, method: string, url: string) {
          this.payload = {
            method,
            url,
          }
          origin.apply(this, [method, url])
        },
    )()
    hookMethod(
      XMLHttpRequest.prototype,
      'send',
      (origin: Function) =>
        function (this: any, ...params: any[]) {
          this.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status >= 400) {
              this.payload.status = this.status
              reportError({ name, data: this.payload }, `Xhr error(${url}):`)
            }
          })
          origin.apply(this, ...params)
        },
    )()
  }
  return { name, start }
}
