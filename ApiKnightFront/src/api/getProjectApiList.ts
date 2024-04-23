import request from './request'
const getProjectApiList = (projectid) => {
  return request.post('v1/project/query', { projectid: projectid })
}
export default getProjectApiList
