import request from './request'
/**
 * 获取项目详细信息，包括api列表，成员列表等
 * @param projectid 
 * @returns 
 */
const getProjectInfo = (projectid) => {
  return request.post('v1/project/query', { projectid: projectid })
}
export default getProjectInfo
