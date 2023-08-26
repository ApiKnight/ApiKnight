import request from './request'
/**
 * 创建mock
 * @param {Object} project_id 项目id，用于定位mock服务的存放位置
 * @param {Object} api_id 接口id，用于定位mock服务的存放位置
 * @param {Object} method 方法
 * @param {Object} url 路径后缀
 * @param {Object} response 响应模板
 * @returns
 */
interface mockReqType {
  name: string
  project_id: string
  api_id: string
  method: string
  url: string
  response: any
}
const mockReq = (mockReqObj: mockReqType) => {
  console.log(mockReqObj)
  return request.post('v1/mock/create', mockReqObj, {})
}
export default mockReq
