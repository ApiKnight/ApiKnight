import request from './request'
/**
 * 登录
 * @param {Object} loginData 登录所需参数
 * @returns 
 */
const login = (loginData) => {
  console.log(loginData)

  return request.post('v1/user/login', loginData, {})
}
export default login
