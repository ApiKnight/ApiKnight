import { TabsSlice } from '@/types/tabSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TabsSlice = {
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
    assign(state, action: PayloadAction<Array<TabsSlice>>) {
      ;(state.data as any) = action.payload
    },
  },
})

export const { assign } = tabsSlice.actions

export default tabsSlice.reducer
