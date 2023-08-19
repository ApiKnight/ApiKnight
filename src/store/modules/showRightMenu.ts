import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FlagValue {
  value: boolean
}

const initialState: FlagValue = {
  value: false,
}

export const showRightMenu = createSlice({
  name: 'showRightMenu',
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

export const { setTrue, setFalse, reversal } = showRightMenu.actions

export default showRightMenu.reducer
