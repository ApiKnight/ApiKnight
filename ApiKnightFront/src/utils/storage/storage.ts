import { USER_ID } from './constant'

/**
 * 获取用户id
 * @returns {string | null} userId
 */
export function getUserId() {
  return localStorage.getItem(USER_ID)
}

/**
 * 设置用户id
 * @param userId 用户id
 */
export function setUserId(userId: string) {
  localStorage.setItem(USER_ID, userId)
}
