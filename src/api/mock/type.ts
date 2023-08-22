import { Method } from '@/types/components'

// 传输类型：发送mock请求
export interface IMockTransfer {
  url: 'string'
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
}
