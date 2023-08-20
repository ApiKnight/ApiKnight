import request from '@/api/request'
import { IAPIInfo } from '@/types/api'
import { IApiResult, IFetchApiTransfer } from './type'

/**
 * 获取接口信息
 * @param apiId 接口id
 * @returns 接口信息
 */
export async function getAPIData(apiId: string): Promise<IAPIInfo> {
  const res = await request.post('/v1/apis/query', { apis_id: apiId })
  const apiDataStr = (res.data as IApiResult<IFetchApiTransfer>).data
    .request_data
  console.log('str', apiDataStr)

  return JSON.parse(apiDataStr)
}
