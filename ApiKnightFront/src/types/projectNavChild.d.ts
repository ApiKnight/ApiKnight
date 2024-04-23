import { ReactNode } from 'react'

interface ProjectNavChildType {
  key: string
  avatar: ReactNode
  content: string
  project_id?: string
  props?: {
    project_id: number | string
  }
}

export type { ProjectNavChildType }
