import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
  // 优化了结构，这个value指向 'gl' 或者 api_id 非常重要，核心功能都有引用，请勿设置别的值（重要！！！）
  value: '',
}

export const rightSlice = createSlice({
  name: 'rightSlice',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setValue } = rightSlice.actions

export default rightSlice.reducer
