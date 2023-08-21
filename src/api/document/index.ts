import request from '@/api/request'
import { IAPIInfo } from '@/types/api'
import type { IApiResult, IFetchApiTransfer } from './type'
import { getInitialApiInfoObj } from '@/utils/documents'

/**
 * 获取纯前端定义的接口信息
 * @param apiId 接口id
 * @returns 接口信息
 */
export async function getApiData(apiId: string): Promise<IAPIInfo> {
  const { data } = await request.post('/v1/apis/query', { apis_id: apiId })
  const apiDataStr = (data as IApiResult<IFetchApiTransfer>).data.request_data
  console.log('str', apiDataStr)

  return JSON.parse(apiDataStr)
}

/**
 * 获取完整且原始的接口信息
 * @param appId 接口id
 * @returns 包含前端定义的接口信息之外的全部接口信息（后端返回的原始信息）
 */
export async function getFullApiData(
  apiId: string,
): Promise<IFetchApiTransfer> {
  const { data }: { data: IApiResult<IFetchApiTransfer> } = await request.post(
    '/v1/apis/query',
    { apis_id: apiId },
  )
  return data.data
}

/**
 * 创建新接口
 * @param projectId 接口所在的项目id
 * @param folderId 接口所在的文件夹id
 * @param userId 接口所有者id
 * @param name 接口名
 * @param desc 接口描述
 * @returns 接口信息
 */
export async function createApi(
  projectId: number,
  folderId: string,
  userId: string,
  name = '新建的接口',
  desc = '',
): Promise<any> {
  const apiData = getInitialApiInfoObj(userId)
  const { data } = await request.post('/v1/apis/create', {
    project_id: projectId,
    folder_id: folderId,
    name: name,
    description: desc,
    request_data: JSON.stringify(apiData),
    response_data: '{}',
  })
  return data
}

/**
 *
 * @param apiId 接口id
 * @param folderId 文件夹id
 * @param name 接口名
 * @param desc 接口描述
 * @param notes 未知参数，项目swagger文档
 * @param apiData api信息
 * @param responseData Mock响应信息
 */
export async function updateApi(
  apiId: number,
  folderId: string,
  name: string,
  desc: string,
  notes: string,
  apiData: IAPIInfo,
  responseData: string,
): Promise<any> {
  const { data } = await request.post('/v1/apis/update', {
    folder_id: folderId,
    request_data: JSON.stringify(apiData),
    response_data: responseData,
    description: desc,
    name: name,
    notes: notes,
    apis_id: apiId,
  })
  return data
}
