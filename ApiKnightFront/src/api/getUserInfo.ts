import { AxiosResponse } from 'axios'
import request from './request'
import { Result } from './request.type'
import { QueryUser } from '@/types/response.type'
/**
 * 获取某个用户个人信息
 * @returns
 */
const getUserInfo = (
  user_id: string,
): Promise<AxiosResponse<Result<QueryUser>>> => {
  return request.post('v1/user/query', { user_id: user_id })
}
export default getUserInfo
