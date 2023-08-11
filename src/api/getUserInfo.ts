import request from './request'
const getUserInfo = (user_id) => {
  return request.post('v1/user/query', { user_id: user_id })
}
export default getUserInfo