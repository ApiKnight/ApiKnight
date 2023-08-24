import request from './request'
/**
 * 获取某个api的mock列表
 * @param api_id
 * @param project_id
 * @returns
 */
const getCurrentRole = (project_id,api_id) => {
  return request.post('v1/mock/list', { project_id: project_id,api_id:api_id })
}
export default getCurrentRole