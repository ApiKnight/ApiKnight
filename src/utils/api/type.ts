import { IAPIInfo } from '@/types/api'

export interface IAPIInfoPlus extends IAPIInfo {
  // 用于存储解析后的apiInfo
  value: IAPIInfo

  /**
   * 获取请求方式
   * @returns 请求方法：如：GET、POST、PUT、DELETE
   */
  getMethod: () => string

  /**
   * 获取请求路径后缀：如：/api/v1/user
   * @returns 请求路径后缀：如：/api/v1/user
   */
  getPath: () => string

  /**
   * 获取请求路径：如：http://localhost:3000/api/v1/user
   * @returns 完整的请求路径：如：/api/v1/user
   */
  getFullUrl: () => string
}
