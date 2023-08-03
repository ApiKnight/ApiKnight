/* eslint-disable */
export function reportError(error: any, logInfo?: string) {
  if (logInfo === '' || logInfo === undefined) {
    logInfo = `url is ${window.location.pathname}:`
  }
  console.log(`${logInfo} occurred: ${error.name}`)
  console.log(`${logInfo} data: ${JSON.stringify(error.data)}`)
}
