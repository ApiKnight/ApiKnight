import { reportError } from './reportError'

export function createBlankScreenMonitor(url?: string) {
  const name = 'blank-screen'
  const entryType = 'paint'
  if (url === '' || url === undefined) {
    url = window.location.pathname
  }
  function start() {
    const p = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstPaintEntry = entries.find(
        (entry) => entry.name === 'first-paint',
      )
      const firstContentfulPaintEntry = entries.find(
        (entry) => entry.name === 'first-contentful-paint',
      )

      if (firstPaintEntry && firstContentfulPaintEntry) {
        const blankScreenTime =
          firstContentfulPaintEntry.startTime - firstPaintEntry.startTime
        reportError({ name, blankScreenTime }, url, name)
      }
    })

    p.observe({ entryTypes: [entryType] })
  }

  return { name, start }
}
