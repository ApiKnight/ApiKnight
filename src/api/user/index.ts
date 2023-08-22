import request from '@/api/request'
import { IUserInfo } from './type'

/**
 * 根据id获取用户信息
 * @param id 用户id
 * @returns 用户信息
 */
export async function getUserInfoById(id: string): Promise<IUserInfo> {
  const { data } = await request.post<IUserInfo>('/v1/user/query', {
    user_id: id,
  })
  return data.data
}
