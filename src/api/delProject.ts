import request from './request'
const delProject = (project_id) => {
  return request.post('v1/project/delete',{projectid:project_id})
}
export default delProject