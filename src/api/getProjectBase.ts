import request from './request'
/**
 * 获取项目基本信息，例如名称，描述
 * @param projectid 
 * @returns 
 */
const getProjectBase = (projectid) => {
  return request.post('v1/project/querysummary', { projectid: projectid })
}
export default getProjectBase
