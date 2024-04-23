import { ArrayItem, ArrayItemTitle, ArrayItemType } from '@/types/arrayToTree'

interface AddData {
  key: string
  pid: string | null
  type?: ArrayItemType
}

interface TitleNode {
  key: string
  title: ArrayItemTitle
  pid: string | null
  type: ArrayItemTitle
}

interface Props {
  data: TitleNode
}

interface MakeValue {
  value: ArrayItem[]
}

export { AddData, Props, TitleNode, MakeValue }
