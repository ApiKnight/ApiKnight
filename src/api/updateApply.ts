import request from './request'
/**
 * 登录
 * @param {Object} loginData 登录所需参数
 * @returns
 */
interface ApplyType {
  id: string
  status: string
  projectid: number
}
const updateApply = (ApplyObj: ApplyType) => {
  return request.post('v1/invite/updatestatus', ApplyObj, {})
}
export default updateApply
