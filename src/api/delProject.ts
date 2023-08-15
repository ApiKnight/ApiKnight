import request from './request'
/**
 * 删除项目
 * @param projectid 
 * @returns 
 */
const delProject = (project_id) => {
  return request.post('v1/project/delete',{projectid:project_id})
}
export default delProject