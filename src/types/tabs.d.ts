import { ArrayItemType } from './arrayToTree'

interface TabsSetItem {
  key: string
  title: string
  type: ArrayItemType
}

interface Props {
  data: TabsSetItem
  active?: boolean
  onSelected?: (index: number) => void
  onRemoveTab?: (index: number) => void
  index: number
}

export type { TabsSetItem, Props }
