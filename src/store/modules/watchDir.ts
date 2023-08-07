import { PayloadAction , createSlice } from '@reduxjs/toolkit';

interface DirValue {
    value: number
}

const initialState: DirValue = {
    value: 0,
}

export const watchDirSlice = createSlice({
    name: "watchDir",
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
    }
})

export const { increment, decrement, incrementByAmount } = watchDirSlice.actions

export default watchDirSlice.reducer