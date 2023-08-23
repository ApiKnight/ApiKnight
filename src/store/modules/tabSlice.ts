import { ArrayItemType } from '@/types/arrayToTree'
import type { TabSlice } from '@/types/tabSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TabSlice = {
  data: [
    {
      key: '0',
      title: '新建页面',
      type: '',
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
    upData(state: any, action: PayloadAction<any>) {
      console.log("update")
      console.log(action.payload)
      state.data.map((item)=>{
        console.log(item)
        if (item.key == action.payload.key) {
          item.type = action.payload.type.value
        }
      })
    }
  },
})

export const { assign, removeData, addData , upData } = tabSlice.actions

export default tabSlice.reducer
