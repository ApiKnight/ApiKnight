import { AxiosResponse } from 'axios'
import { LoginType } from './loginType'
import request from './request'
import { Result } from './request.type'
import { LoginReturnType } from '@/types/response.type'
/**
 * 登录
 * @param {Object} loginData 登录所需参数
 * @returns
 */
const login = (
  loginData: LoginType,
): Promise<AxiosResponse<Result<LoginReturnType>>> => {
  return request.post('v1/user/login', loginData, {})
}
export default login
