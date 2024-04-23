import request from './request'
/**
 * 获取项目详细信息，包括api列表，成员列表等
 * @param projectid
 * @returns
 */
const reqDelMember = (project_id, user_id) => {
  return request.post('v1/members/delete', {
    project_id: project_id,
    user_id: user_id,
  })
}
export default reqDelMember
