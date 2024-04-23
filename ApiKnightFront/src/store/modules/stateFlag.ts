import { createSlice } from '@reduxjs/toolkit'

interface FlagValue {
  value: boolean
}

const initialState: FlagValue = {
  value: false,
}

export const stateFlag = createSlice({
  name: 'stateFlag',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true
    },
    setFalse: (state) => {
      state.value = false
    },
    reversal: (state) => {
      state.value = !state.value
    },
  },
})

export const { setTrue, setFalse, reversal } = stateFlag.actions

export default stateFlag.reducer
