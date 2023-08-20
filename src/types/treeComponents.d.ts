import { ArrayItem, ArrayItemTitle } from '@/types/arrayToTree'

interface AddData {
  key: string
  pid: string | null
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
}

interface TitleNode {
  key: string
  title: ArrayItemTitle
  pid: string | null
  types: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
}

interface Props {
  data: TitleNode
}

interface MakeValue {
  value: ArrayItem[]
}

export { AddData, Props, TitleNode, MakeValue }
