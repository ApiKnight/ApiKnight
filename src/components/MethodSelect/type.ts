export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH'
  | 'TRACE'
  | 'CONNECT'
  | 'COPY'
  | 'LINK'
  | 'UNLINK'
  | 'MKCOL'
  | 'MOVE'
  | 'PROPFIND'
  | 'REPORT'
  | 'VIEW'

export interface ApiOptReqOptType {
  label: string
  value: Method
  colorClassName?: string
}

export interface MethodSelectProps {
  // 接口选项信息
  methodOptions?: ApiOptReqOptType[]
  // 默认展示的接口信息
  defaultMethod?: ApiOptReqOptType
  // 接口信息值
  methodValue?: ApiOptReqOptType
  // 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。
  popupMatchSelectWidth?: number
  // 左侧选项改变事件
  onOptionChange?: (value: ApiOptReqOptType) => void
}
