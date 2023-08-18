import { RequestParamsType } from '@/store/modules/document'
import { InfoType } from '../types'

export interface ReqParamsPropsType {
  onInfoChange?: (value: RequestParamsType, type: InfoType) => void
}

export enum NavType {
  Params = 'Params',
  Body = 'Body',
  Cookie = 'Cookie',
  Header = 'Header',
  Auth = 'Auth',
}

export type NavItem = {
  label: string
  value: NavType
}
