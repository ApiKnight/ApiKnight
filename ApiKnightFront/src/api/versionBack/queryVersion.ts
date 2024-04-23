import { VersionInfo } from '@/types/versionInfo'
import request from '@/api/request'
import { AxiosResponse } from 'axios'
import { Result } from '../request.type'
import { ApiType } from '@/types/response.type'

interface ApiTypeVersion extends ApiType {
  notes: string
}
async function getVersionInfo(apis_id: string): Promise<VersionInfo[]> {
  const resp: AxiosResponse<Result<ApiTypeVersion[]>> = await request.post(
    '/v1/apis/queryversion',
    {
      apis_id: apis_id,
    },
    {},
  )
  const returnData: Array<VersionInfo> = []
  resp.data.data.map((item) => {
    returnData.push({
      id: item.id,
      notes: item.notes,
    })
  })
  return returnData
}

export { getVersionInfo }
