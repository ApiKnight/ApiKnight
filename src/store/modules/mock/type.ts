import { NavType } from '@/types/enum'

export type NormalParamsActionType = {
  payload: {
    key: 'value' | 'paramName'
    value: string
    index: number
    paramType: NavType
  }
}

export type ParamsOptActionType = {
  payload: { isInsert: boolean; removeIndex: number; paramType: NavType }
}
