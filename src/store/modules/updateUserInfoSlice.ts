import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: boolean
}

const initialState: CounterState = {
  value: false,
}

export const updateUserInfoSlice = createSlice({
  name: 'updateUserInfoSlice',
  initialState,
  reducers: {
    setIValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIValue } = updateUserInfoSlice.actions

export default updateUserInfoSlice.reducer
