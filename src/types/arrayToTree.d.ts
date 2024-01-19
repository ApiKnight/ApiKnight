import { ReactNode } from 'react'

interface FlatArrayItem {
  key: string
  title: string
  type: ArrayItemType
  pid: null | string
}

interface AddDir {
  project_id: number
  parent_id: string
  pid?: string | null
}

interface ArrayItemTitle {
  key: string
  title: string
  pid: string | null
  type: ArrayItemType
}

type ArrayItemType =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH'
  | 'FILE'
  | 'gl'
  | ''

interface ArrayItem {
  key: string
  title: string | ArrayItem
  pid: string | null
  type: ArrayItemType
}

interface ArrayNode {
  key: string
  title: ReactNode | Element
  pid: string | null
  type: ArrayItemType
  isLeaf?: boolean | undefined
}

interface TreeNode {
  key: string
  title: ReactNode
  type: ArrayItemTitle
  pid: string | null
  children?: TreeNode[]
  isLeaf?: boolean
}

interface delProps {
  type: ArrayItemType
  key: string
}

export type {
  TreeNode,
  ArrayItem,
  ArrayNode,
  FlatArrayItem,
  AddDir,
  ArrayItemTitle,
  ArrayItemType,
  delProps,
}
