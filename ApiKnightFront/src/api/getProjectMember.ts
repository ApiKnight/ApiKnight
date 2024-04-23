import { MemberList } from '@/types/response.type'
import { AxiosResponse } from 'axios'
import request from './request'
import { Result } from './request.type'
/**
 * 获取项目成员列表
 * @param projectid
 * @returns
 */
const getProjectMember = (
  projectid,
): Promise<AxiosResponse<Result<MemberList[]>>> => {
  return request.post('v1/members/list', { projectid: projectid })
}
export default getProjectMember
