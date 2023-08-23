import { ArrayItemType } from './arrayToTree'

interface TabsSetItem {
  key: string
  title: string
  type: ArrayItemType
}

interface Props {
  data: TabsSetItem
  active?: boolean
}

export type { TabsSetItem, Props }
