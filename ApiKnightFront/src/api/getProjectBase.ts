import { AxiosResponse } from 'axios'
import request from './request'
import { Result } from './request.type'
import { QuerySummary } from '@/types/response.type'
/**
 * 获取项目基本信息，例如名称，描述
 * @param projectid
 * @returns
 */
const getProjectBase = (
  projectid,
): Promise<AxiosResponse<Result<QuerySummary>>> => {
  return request.post('v1/project/querysummary', { projectid: projectid })
}
export default getProjectBase
