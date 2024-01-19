import type { TabSlice } from '@/types/tabSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TabSlice = {
  data: [
    {
      key: 'project-summary',
      title: '项目概览',
      type: 'gl',
    },
  ],
  // 当前标签页的key
  currentKey: 'project-summary',
}

const tabSlice = createSlice({
  name: 'tabSlice',
  initialState,
  reducers: {
    assign(state, action: PayloadAction<TabSlice['data']>) {
      state.data = action.payload
    },
    removeData(state, action: PayloadAction<string>) {
      state.data = state.data.filter((item) => {
        return item.key !== action.payload
      })
    },
    addData(state, action: PayloadAction<TabSlice['data'][0]>) {
      // 限制标签栏的数量最多为7个
      if (state.data.length >= 7) {
        // 删除第一个不是项目概览的标签
        const delIndex = state.data.findIndex(
          (item) => item.key !== 'project-summary',
        )
        state.data.splice(delIndex, 1)
      }
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
    upData(
      state,
      action: PayloadAction<{
        key: string
        type: { value: string }
        title: string
      }>,
    ) {
      console.log('update')
      console.log(action.payload)
      state.data.map((item) => {
        console.log(item)
        if (item.key == action.payload.key) {
          item.type = action.payload.type.value
        }
      })
    },
    changeCurrentKeyAction(state, { payload }) {
      state.currentKey = payload
    },
    // 关闭标签栏的action
    removeTabAction(state, { payload }: { payload: number }) {
      state.data.splice(payload, 1)
    },
    addDataItemAction(
      state,
      action: PayloadAction<{ item: TabSlice['data'][0]; index?: number }>,
    ) {
      // 如果有index，就在index的位置插入，否则就在最后插入
      const { item, index } = action.payload
      // 如果已经存在当前的key，就不再添加
      const isExist = state.data.some((i) => i.key === item.key)
      if (isExist) return

      if (index) {
        state.data.splice(index, 0, item)
      } else {
        state.data.push(item)
      }
    },
  },
})

export const {
  assign,
  removeData,
  addData,
  upData,
  changeCurrentKeyAction,
  removeTabAction,
  addDataItemAction,
} = tabSlice.actions

export default tabSlice.reducer
