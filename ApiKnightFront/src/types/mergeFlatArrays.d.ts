import { ArrayItemType } from './arrayToTree'
import { ApiType, CreateUser, FolderType } from './response.type'

interface FlatItem {
  id: string
  parent_id?: string | null
  project_id: number
  name: string
  folder_id?: string
  create_user?: CreateUser | string
  create_time?: string
  operate_time?: string
  operate_user?: string
  request_data?: string
  response_data?: string
  description?: string
  type?: ArrayItemType | null
  api_list?: Array<ApiType>
  folder_list?: Array<FolderType>
}
interface FlatItemValue {
  value_1: FlatItem[]
  value_2: FlatItem[]
  target: number | null
}
interface InitValue {
  value: FlatItemValue
}
export type { FlatItem, FlatItemValue, InitValue }
