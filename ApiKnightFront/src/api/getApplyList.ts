import { AxiosResponse } from 'axios'
import request from './request'
import { Result } from './request.type'
import { WListItem } from '@/types/response.type'
/**
 * 获取申请列表
 * @param projectid
 * @returns
 */
const getApplyList = (
  projectid,
): Promise<AxiosResponse<Result<WListItem[]>>> => {
  return request.post('v1/invite/wlist', { projectid: projectid })
}
export default getApplyList
