import request from './request'
/**
 * 登录
 * @param {Object} loginData 登录所需参数
 * @returns
 */
type mockReq={

}
const mockReq = (mockReqObj:mockReq) => {
  console.log(mockReqObj)
  return request.post('v1/user/mockReq', mockReqObj, {})
}
export default mockReq
