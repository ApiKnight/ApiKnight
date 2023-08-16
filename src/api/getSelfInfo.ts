import request from './request'
/**
 * 获取用户自身个人信息
 * @returns
 */
const getSelfInfo = () => {
  return request.post('v1/user/queryself')
}
export default getSelfInfo
