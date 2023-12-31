import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: boolean
}

const initialState: CounterState = {
  value: false,
}

export const templateSlice = createSlice({
  name: 'templateSlice',
  initialState,
  reducers: {
    setTemplateValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTemplateValue } = templateSlice.actions

export default templateSlice.reducer
