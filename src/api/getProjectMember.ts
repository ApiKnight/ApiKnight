import request from './request'
const getProjectMember = (projectid) => {
  return request.post('v1/members/list',{projectid:projectid})
}
export default getProjectMember