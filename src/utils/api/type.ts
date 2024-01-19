import { DataType, IAPIInfo } from '@/types/api'
import { ArrayItemType } from '@/types/arrayToTree'

export interface IAPIInfoPlus extends IAPIInfo {
  // 用于存储解析后的apiInfo
  value: IAPIInfo

  /**
   * 获取请求方式
   * @returns 请求方法：如：GET、POST、PUT、DELETE
   */
  getMethod: () => ArrayItemType | null

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

interface SwaggerParameter {
  name?: string
  required?: boolean
  description?: string
  type?: DataType
  in?: 'query' | 'header' | 'cookie' | 'body'
  'x-example'?: string[]
}

interface SwaggerPathInfo {
  [method: string]: {
    description?: string
    summary?: string
    tags?: string[]
    parameters?: SwaggerParameter[]
  }
}

interface SwaggerPaths {
  [path: string]: SwaggerPathInfo
}

type SwaggerDoc = {
  Path: string
  paths: SwaggerPaths
}

export type { SwaggerDoc, SwaggerParameter, SwaggerPaths, SwaggerPathInfo }
