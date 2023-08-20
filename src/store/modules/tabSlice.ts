import { ArrayItemType } from '@/types/arrayToTree'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TabSlice {
  data: [
    {
      key: string
      title: string
      type: ArrayItemType
    },
  ]
}

const initialState: TabSlice = {
  data: [
    {
      key: '0',
      title: '',
      type: 'GET',
    },
  ],
}

const tabSlice = createSlice({
  name: 'tabSlice',
  initialState,
  reducers: {
    assign(state: any, action: PayloadAction<Array<TabSlice>>) {
      state.data = action.payload
    },
    removeData(state: any, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => {
        return item.key !== action.payload
      })
    },
    addData(state: any, action: PayloadAction<TabSlice>) {
      const temp = state.data
      temp.push(action.payload)
      state.data = temp.filter((value, index, self) => {
        const jsonValue = JSON.stringify(value)
        return (
          index ===
          self.findIndex((obj) => {
            return JSON.stringify(obj) === jsonValue
          })
        )
      })
    },
  },
})

export const { assign, removeData, addData } = tabSlice.actions

export default tabSlice.reducer
