import request from './request'
/**
 * 获取某个用户个人信息
 * @returns 
 */
const getUserInfo = (user_id) => {
  return request.post('v1/user/query', { user_id: user_id })
}
export default getUserInfo
