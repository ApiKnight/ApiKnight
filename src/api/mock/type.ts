import { Method } from '@/types/components'

// 传输类型：发送mock请求
export interface IMockTransfer {
  project_id: number
  url: string
  method: string // 小写
  response: string
  // {
  //   // 虽然是string，但是是json格式的字符串
  //   params: [
  //     {
  //       key: 'id'
  //       type: 'string'
  //       example: 'abc123' // 没有给随机生成，给了就用example
  //     },
  //     {
  //       key: 'name'
  //       type: 'string'
  //     },
  //   ]
  // }
  headers: string
  params: string
  data: string
  apis_id: string
  name: string
}
