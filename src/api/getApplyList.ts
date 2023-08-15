import request from './request'
/**
 * 获取申请列表
 * @param projectid 
 * @returns 
 */
const getApplyList = (projectid) => {
  return request.post('v1/invite/alist', { projectid: projectid })
}
export default getApplyList
