// 传输类型：发送mock请求
export interface IMockTransfer {
  project_id: number
  url: string
  method: string // 小写
  response: string
  headers: string
  params: string
  data: string
  apis_id: string
  name: string
}
