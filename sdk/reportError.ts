import request from '../src/api/request'

/* eslint-disable */
export function reportError(error: any, url: string, type: string) {
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  const sendData = {
    url: url,
    type: type,
    message: JSON.stringify(error),
  }
  navigator.sendBeacon('https://polaris.lyyfsq.club:7002/api/v1/monitor/upload',JSON.stringify(sendData))
}
