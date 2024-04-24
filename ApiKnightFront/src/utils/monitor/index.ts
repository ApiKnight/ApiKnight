import { baseURL } from '@/config/config'
import { Monitor } from '@apiknight/monitor-sdk/src/index'

const { createAllMonitor, report } = Monitor(baseURL + '/v1/monitor/upload')

export { createAllMonitor, report }
