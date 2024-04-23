// 前端定义的请求相关的类型（主要在文档、修改文档、Mock页面使用）
import { Method } from '@/types/components'

type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null'

// 文档元信息
export interface MetaInfo {
  created: number
  status: number
  owner_id: string
  tags: string[]
  desc: string
  api_id?: string
  folder_id?: string
  description?: string
  name?: string
  notes?: string
}

// 键值对类型参数
export interface NormalParamsType {
  id: number
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
  body: string
}

// 响应信息类型
export interface ResponseType {
  status: number
  body: string
}

// API信息结构
export interface IAPIInfo {
  meta_info: MetaInfo

  apiInfo: {
    base: BaseInfoType
    request: RequestParamsType
    response: ResponseType
  }
}
