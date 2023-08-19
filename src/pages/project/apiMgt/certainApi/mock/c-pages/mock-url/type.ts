import { Method } from '@/types/components'
import { InfoType } from '../types'

// 组件Prop属性
export interface MockUrlProps {
  // 请求类型
  method?: Method
  // 请求地址
  path?: string
  // 请求改变回调
  onInfoChange: (info: MockUrlInfo, type: InfoType) => void
  onSend: (isDownload: boolean) => void
}

export type MockUrlInfo = Omit<Omit<MockUrlProps, 'onInfoChange'>, 'onSend'>
