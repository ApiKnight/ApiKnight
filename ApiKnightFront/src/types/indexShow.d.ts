import { ReactNode } from 'react'

interface IndexData {
  key: number
  icon: ReactNode
  title: string
  desc: ReactNode
}

interface IndexProps {
  data: IndexData
}

export type { IndexData, IndexProps }
