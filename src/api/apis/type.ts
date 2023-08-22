import { IAPIInfo } from '@/types/api'
import exp from 'constants'

// 传输类型:获取接口信息
export interface IFetchApiTransfer {
  id: string
  folder_id: string
  create_user: string
  create_time: string
  operate_time: string
  operate_user: string
  request_data: string
  response_data: string
  project_id: number
  description: string
  name: string
}

// 传输类型：更新接口信息
export interface IUpdateApiTransfer {
  apiId: string
  folderId: string
  name: string
  desc: string
  notes: string
  apiData: IAPIInfo
  responseData: string
}

export interface IApiResult<T> {
  code: number
  message: string
  result?: T
  data?: T
}
