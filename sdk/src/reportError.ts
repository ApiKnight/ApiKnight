/* eslint-disable */
type ReportType = Record<string,any>
export function reportError(error: ReportType, url: string, type: string) {
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  console.log(error instanceof Object)
  console.log(error)
  error.userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : "New User"
  error.curTime = String(+new Date());
  const sendData = {
    url: url,
    type: type,
    message: JSON.stringify(error),
  }
  navigator.sendBeacon(`https://lyyfsq.club:7000/api/v1/monitor/upload`,JSON.stringify(sendData))
}
