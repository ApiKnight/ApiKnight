import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IsUpdateSlice {
  value: number
}

const initialState: IsUpdateSlice = {
  value: 0,
}

export const isUpdateSlice = createSlice({
  name: 'isUpdateSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = isUpdateSlice.actions

export default isUpdateSlice.reducer
