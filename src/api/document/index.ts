import request from '@/api/request'
import { IAPIInfo } from '@/types/api'
import { IApiResult, ICreateApiTransfer, IFetchApiTransfer } from './type'
import { getInitialApiInfoObj } from '@/utils/documents'

/**
 * 获取接口信息
 * @param apiId 接口id
 * @returns 接口信息
 */
export async function getApiData(apiId: string): Promise<IAPIInfo> {
  const { data } = await request.post('/v1/apis/query', { apis_id: apiId })
  const apiDataStr = (data as IApiResult<IFetchApiTransfer>).data.request_data
  console.log('str', apiDataStr)

  return JSON.parse(apiDataStr)
}

export async function createApi(
  projectId: number,
  folderId: string,
  userId: string,
  name = '新建的接口',
  desc = '',
): Promise<IApiResult<any>> {
  const apiData = getInitialApiInfoObj(userId)
  const { data } = await request.post<IApiResult<any>>('/v1/apis/create', {
    project_id: projectId,
    folder_id: folderId,
    name: name,
    description: desc,
    request_data: JSON.stringify(apiData),
    response_data: '{}',
  })
  return data
}
