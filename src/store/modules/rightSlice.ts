import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    value: string
}

const initialState: CounterState = {
    value: "",
}

export const rightSlice = createSlice({
    name: 'rightSlice',
    initialState,
    reducers: {
        setValue: (state,action: PayloadAction<string>) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setValue } = rightSlice.actions

export default rightSlice.reducer
