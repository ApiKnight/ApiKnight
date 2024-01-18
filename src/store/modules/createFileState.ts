import { createSlice } from '@reduxjs/toolkit'

interface FlagValue {
  value: boolean
}

const initialState: FlagValue = {
  value: false,
}

export const createFileState = createSlice({
  name: 'createFileState',
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

export const { setTrue, setFalse, reversal } = createFileState.actions

export default createFileState.reducer
