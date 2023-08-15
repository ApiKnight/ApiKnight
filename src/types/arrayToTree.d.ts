import { ReactNode } from 'react'

interface FlatArrayItem {
  key: string
  title: string
  type:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH'
    | 'FILE'
  pid: null | string
}

interface AddDir {
  project_id: number
  parent_id: string
}

interface ArrayItem {
  key: string
  title: {
    key: string
    title: string
    pid: string | null
    type:
      | 'GET'
      | 'POST'
      | 'PUT'
      | 'DELETE'
      | 'OPTIONS'
      | 'HEAD'
      | 'PATCH'
      | 'FILE'
  }
  pid: string | null
  type:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH'
    | 'FILE'
  isLeaf?: boolean | undefined
}

interface ArrayNode {
  key: string
  title: ReactNode
  pid: string | null
  type: string
  isLeaf?: boolean | undefined
}

interface TreeNode {
  key: string
  title: ReactNode
  type: string
  pid: string | null
  children?: TreeNode[]
  isLeaf?: boolean
}

export type { TreeNode, ArrayItem, ArrayNode, FlatArrayItem, AddDir }
