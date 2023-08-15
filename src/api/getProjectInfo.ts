import request from './request'
const getProjectInfo = (projectid) => {
  return request.post('v1/project/query', { projectid: projectid })
}
export default getProjectInfo
