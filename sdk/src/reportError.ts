/* eslint-disable */
type ReportType = Record<string, any>
export function reportError(adress: string) {
  function _reportError(error: ReportType, url: string, type: string) {
    if (url === '' || url === undefined) {
      url = window.location.pathname
    }
    console.log(error instanceof Object)
    console.log(error)
    error.userId = localStorage.getItem('user_id')
      ? localStorage.getItem('user_id')
      : 'New User'
    error.curTime = String(+new Date())
    const sendData = {
      url: url,
      type: type,
      message: JSON.stringify(error),
    }
    navigator.sendBeacon(adress, JSON.stringify(sendData))
  }
  return _reportError
}
