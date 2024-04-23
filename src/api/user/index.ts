import request from '@/api/request'
import { IUserInfo } from './type'
import { Result } from '../request.type'
import { SendData } from '@/components/UpdateUserInfo/type'
import { CreateUser } from '@/types/response.type'

/**
 * 根据id获取用户信息
 * @param id 用户id
 * @returns 用户信息
 */
export async function getUserInfoById(id: string): Promise<Result<IUserInfo>> {
  const { data } = await request.post<IUserInfo>('/v1/user/query', {
    user_id: id,
  })
  return data
}

export async function updateUser(sendData: SendData) {
  const { data } = await request.post('/v1/user/update', sendData, {})
  return data
}

export async function apiQuerySelf() {
  const { data } = await request.post<CreateUser>('/v1/user/queryself', {}, {})
  return data
}
