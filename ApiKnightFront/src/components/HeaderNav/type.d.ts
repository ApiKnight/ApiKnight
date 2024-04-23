import { CreateUser } from '@/types/response.type'

interface ChildrenProps {
  ifHideUser?: boolean
  user_info?: null | CreateUser | Record<string, string>
}

export type { ChildrenProps }
