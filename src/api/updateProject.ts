import request from './request'
const updateProject = (projectInfo) => {
  return request.post('v1/project/update',projectInfo)
}
export default updateProject