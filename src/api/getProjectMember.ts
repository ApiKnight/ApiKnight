import request from './request'
/**
 * 获取项目成员列表
 * @param projectid 
 * @returns 
 */
const getProjectMember = (projectid) => {
  return request.post('v1/members/list',{projectid:projectid})
}
export default getProjectMember