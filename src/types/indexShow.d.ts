import { ReactNode } from 'react'

interface IndexData {
  icon: ReactNode
  title: string
  desc: ReactNode
}

interface IndexProps {
  data: IndexData
}

export type { IndexData, IndexProps }
