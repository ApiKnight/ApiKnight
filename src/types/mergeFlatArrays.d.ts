interface FlatItem {
  id: string
  parent_id?: string | null
  project_id: number
  name: string
  folder_id?: string
  create_user?: any
  create_time?: any
  operate_time?: any
  operate_user?: any
  request_data?: any
  response_data?: any
  description?: any
  type?:
    | null
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH'
    | 'FILE'
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
