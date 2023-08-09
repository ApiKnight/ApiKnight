import { ArrayItem } from '@/types/arrayToTree'

interface AddData {
  key: string
  pid: string | null
}

interface TitleNode {
  key: string
  title: string
  pid: string | null
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
}

interface Props {
  data: TitleNode
}

interface MakeValue {
  value: ArrayItem[]
}

export { AddData, Props, TitleNode, MakeValue }
