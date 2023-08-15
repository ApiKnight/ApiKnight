import request from './request'
const getSelfInfo = () => {
  return request.post('v1/user/queryself')
}
export default getSelfInfo
