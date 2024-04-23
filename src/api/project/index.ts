import { QuerySummary } from '@/types/response.type'
import request from '../request'
import { IGetProjectInfoTransfer } from './type'

/**
 * 获取项目信息
 * @param projectId 项目id
 * @returns 项目信息
 */
export async function getProjectInfoById(projectId: number) {
  const { data } = await request.post<IGetProjectInfoTransfer>(
    '/v1/project/query',
    {
      projectid: projectId,
    },
  )
  return data
}

export async function querySummaryProject(projectid: string | number) {
  const { data } = await request.post<QuerySummary>(
    '/v1/project/querysummary',
    { projectid },
    {},
  )
  return data
}
