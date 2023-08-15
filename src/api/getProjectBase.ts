import request from './request'
const getProjectBase = (projectid) => {
  return request.post('v1/project/querysummary', { projectid: projectid })
}
export default getProjectBase
