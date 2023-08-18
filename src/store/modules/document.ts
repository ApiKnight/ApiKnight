import { Method } from '@/types/components'
import { createSlice } from '@reduxjs/toolkit'

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

// 文档数据结构
export interface DocumentState {
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

const initialState: DocumentState = {
  meta_info: {
    created: '',
    status: '',
    owner_id: '',
    tags: [],
    desc: '',
  },
  apiInfo: {
    base: {
      method: 'GET',
      path: '/exapmle/api',
    },
    request: {
      params: [
        {
          paramName: 'paramstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'paramstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      headers: [
        {
          paramName: 'headerstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'headerstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      cookie: [
        {
          paramName: 'cookietestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'cookietestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      body: 'HelloWorld',
    },
    response: {
      status: 0,
      body: '',
    },
  },
}

const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {},
})

export const {} = documentSlice.actions
export default documentSlice.reducer
