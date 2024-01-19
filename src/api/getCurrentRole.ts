import { AxiosResponse } from 'axios'
import request from './request'
import { Result } from './request.type'
import { QueryRole } from '@/types/response.type'
/**
 * 获取在当前项目的身份
 * @param projectid
 * @returns
 */
const getCurrentRole = (
  projectid,
): Promise<AxiosResponse<Result<QueryRole>>> => {
  return request.post('v1/members/queryrole', { project_id: projectid })
}
export default getCurrentRole
