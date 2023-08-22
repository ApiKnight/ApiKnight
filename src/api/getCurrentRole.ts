import request from './request'
/**
 * 获取在当前项目的身份
 * @param projectid
 * @returns
 */
const getCurrentRole = (projectid) => {
  return request.post('v1/members/queryrole', { project_id: projectid })
}
export default getCurrentRole