import { type } from 'os'

interface TabSlice {
  data: {
    key: string
    title: string
    type: ArrayItemType
  }[]
  currentKey: string
}

interface TabsSlice {
  data: [
    {
      id: string
      folder_id: string
      create_user: string
      create_time: string
      operate_time: string
      operate_user: string
      request_data: string
      response_data: string
      project_id: number
      description: string
      name: string
    },
  ]
  currentKey?: string
}

export type { TabSlice, TabsSlice }
