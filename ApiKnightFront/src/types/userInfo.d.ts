import { ReactNode } from 'react'
interface UserShowType {
  id: string
  key: string
  type: string
  value: string
  use: ReactNode
}

interface SendProps {
  sendType: 'email' | 'phone' | 'username'
}

export type { UserShowType, SendProps }
