import request from './request'
/**
 * 更新项目信息
 * @param {Object} projectInfo 项目信息，id必须，描述或名称至少有一个
 * @returns 
 */
const updateProject = (projectInfo) => {
  return request.post('v1/project/update', projectInfo)
}
export default updateProject
