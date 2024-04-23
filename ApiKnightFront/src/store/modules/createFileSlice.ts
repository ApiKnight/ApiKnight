import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CreateFileValue {
  project_id: number
  parent_id: string
}

const initialState: CreateFileValue = {
  project_id: 0,
  parent_id: '',
}

export const createFileSlice = createSlice({
  name: 'createFileSlice',
  initialState,
  reducers: {
    setValue(_state, action: PayloadAction<CreateFileValue>) {
      return action.payload // 直接返回有效载荷
    },
  },
})

export const { setValue } = createFileSlice.actions

export default createFileSlice.reducer
