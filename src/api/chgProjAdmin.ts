import request from './request'
/**
 * 转让项目
 * @param project_id 项目id
 * @param user_id 用户id
 * @returns
 */
const chgProjAdmin = ({project_id,user_id}) => {
  return request.post('/v1/members/convert', { project_id: project_id, user_id:user_id })
}
export default chgProjAdmin
