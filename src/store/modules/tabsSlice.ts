import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TabSlice {
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
}

const initialState: TabSlice = {
  data: [
    {
      id: '',
      folder_id: '',
      create_user: '',
      create_time: '',
      operate_time: '',
      operate_user: '',
      request_data: '',
      response_data: '',
      project_id: 0,
      description: '',
      name: '',
    },
  ],
}

const tabsSlice = createSlice({
  name: 'tabsSlice',
  initialState,
  reducers: {
    assign(state, action: PayloadAction<Array<TabSlice>>) {
      state.data = action.payload
    },
  },
})

export const { assign } = tabsSlice.actions

export default tabsSlice.reducer
