import { InfoType } from '../types'

export interface ResponsePropsType {
  onInfoChange?: (value: string, type: InfoType) => void
}
