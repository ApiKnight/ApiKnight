/* eslint-disable */
export function reportError(error: any, url: string, type: string) {
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  error.userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : "New User"
  error.curTime = +new Date();
  const sendData = {
    url: url,
    type: type,
    message: JSON.stringify(error),
  }
  navigator.sendBeacon('https://lyyfsq.club:7000/api/v1/monitor/upload',JSON.stringify(sendData))
}
