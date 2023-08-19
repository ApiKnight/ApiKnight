// 前端定义的请求相关的类型（主要在文档、修改文档、Mock页面使用）
import { Method } from '@/types/components'

type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null'

// 键值对类型参数
export interface NormalParamsType {
  paramName: string
  type: DataType
  desc?: string
  required?: boolean
  value?: string
}

// 请求基本信息
export interface BaseInfoType {
  method: Method
  path: string
  prefix: string
}
// 请求信息类型
export interface RequestParamsType {
  params: NormalParamsType[]
  headers: NormalParamsType[]
  cookie: NormalParamsType[]
  body: any
}

// 响应信息类型
export interface ResponseType {
  status: number
  body: string
}

// API信息结构
export interface IAPIInfo {
  meta_info: {
    created: string
    status: string
    owner_id: string
    tags: string[]
    desc: string
  }

  apiInfo: {
    base: BaseInfoType
    request: RequestParamsType
    response: ResponseType
  }
}
