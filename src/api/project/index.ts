import request from '../request'
import { IGetProjectInfoTransfer } from './type'

/**
 * 获取项目信息
 * @param projectId 项目id
 * @returns 项目信息
 */
export async function getProjectInfoById(
  projectId: number,
): Promise<IGetProjectInfoTransfer> {
  const { data } = await request.post<IGetProjectInfoTransfer>(
    '/v1/project/query',
    {
      projectid: projectId,
    },
  )
  return data.data
}
