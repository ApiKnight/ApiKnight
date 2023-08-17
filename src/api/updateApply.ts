import request from './request'
interface ApplyType {
  id: string
  status: string
  projectid: number
}
/**
 * 审批请求，例如同意或拒绝
 * @param {Object} ApplyObj 审批所需参数
 * @returns
 */
const updateApply = (ApplyObj: ApplyType) => {
  return request.post('v1/invite/updatestatus', ApplyObj, {})
}
export default updateApply
