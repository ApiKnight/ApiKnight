import request from './request'
interface AuthorityType {
  id: 'string'
  role: 'string'
}
/**
 * 更改成员权限
 * @param {Object} AuthorityObj 更改成员权限所需参数
 * @returns
 */
const updateAuthority = (AuthorityObj: AuthorityType) => {
  return request.post('v1/members/update', AuthorityObj, {})
}
export default updateAuthority
