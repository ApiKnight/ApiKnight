import { BaseInfoType, RequestParamsType } from '@/store/modules/document'

export type InfoType = 'base' | 'request' | 'response'

export interface MockInfo {
  base: BaseInfoType
  request: RequestParamsType
  response: string
}
