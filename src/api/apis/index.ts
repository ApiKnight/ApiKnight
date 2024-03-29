import request from '@/api/request'
import { IAPIInfo } from '@/types/api'
import type { IApiResult, IFetchApiTransfer, IUpdateApiTransfer } from './type'
import { getInitialApiInfoObj } from '@/utils/documents'
import { IRawApiInfo } from '../project/type'
import { getRangeRandom } from '@/utils/math'
import { createMock } from '..'
import { baseURL } from '@/config/config'
import { AxiosResponse } from 'axios'
import { Result } from '../request.type'

/**
 * 获取纯前端定义的接口信息
 * @param apiId 接口id
 * @returns 接口信息
 */
export async function getApiData(apiId: string): Promise<IAPIInfo> {
  const { data } = await request.post('/v1/apis/query', { apis_id: apiId })
  const apiDataStr = (data as unknown as IApiResult<IFetchApiTransfer>).data
    .request_data
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
 * 创建空接口（基本信息自动生成）
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
  desc = '新建的接口描述',
): Promise<void> {
  const apiData = getInitialApiInfoObj(userId)
  await request.post('/v1/apis/create', {
    project_id: projectId,
    folder_id: folderId,
    name: name,
    description: desc,
    request_data: JSON.stringify(apiData),
    response_data: '{}',
  })
}

/**
 * 基于完整的信息创建接口
 */
export async function createFullApi(options: {
  projectId: number
  folderId: string
  requestData: IAPIInfo
  responseDataStr: string
  description: string
  name: string
}): Promise<void> {
  const {
    projectId,
    folderId,
    requestData,
    responseDataStr,
    description,
    name,
  } = options
  await request.post('/v1/apis/create', {
    project_id: projectId,
    folder_id: folderId,
    name: name,
    description: description,
    request_data: JSON.stringify(requestData).replace(/\\s/g, ''),
    response_data: responseDataStr,
  })
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
  options: IUpdateApiTransfer,
): Promise<Result<never>> {
  const { apiId, folderId, name, desc, notes, apiData, responseData } = options
  const resp: AxiosResponse<Result<never>> = await request.post(
    '/v1/apis/update',
    {
      folder_id: folderId,
      request_data: JSON.stringify(apiData).replace(/\\s/g, ''),
      response_data: responseData.replace(/\\s/g, ''),
      description: desc,
      name: name,
      notes: notes,
      apis_id: apiId,
    },
  )
  return resp.data
}

/**
 * 删除接口信息
 * @param apiId 接口id
 * @returns
 */
export async function deleteApi(apiId: string) {
  const { data } = await request.post('/v1/apis/delete', { apis_id: apiId })
  return data
}

/**
 * 分享接口(会自动抹除敏感信息)
 * @param apiList 需要分享的api列表
 * @param projectId 该api列表所在的项目id
 * @returns 用于导入的url
 */
export async function shareApi(apiList: IRawApiInfo[], projectId: number) {
  const list = apiList.map((item) => {
    // 删除重要信息
    const apiInfo: IAPIInfo = JSON.parse(item.request_data)
    apiInfo.meta_info.created = Date.now()
    apiInfo.meta_info.owner_id = 'unknown'
    apiInfo.meta_info.folder_id = item.folder_id
    return apiInfo
  })
  const str = JSON.stringify(list)
  const identity = getRangeRandom(10000, 99999)
  const sharePath = '/share&identity=' + identity
  await createMock({
    project_id: projectId,
    url: sharePath,
    method: 'get',
    apis_id: 'metaInfo.api_id',
    name: 'share-api-' + identity,
    headers: '{}',
    params: '{}',
    response: JSON.stringify({ example: { data: str, type: 'apiknight' } }),
    data: '{}',
  })
  return `${baseURL}v1/mock/${projectId}${sharePath}`
}
