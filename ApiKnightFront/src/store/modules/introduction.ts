import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getInitialApiInfoObj } from '@/utils/documents'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取接口数据
export const fetchApiDataAction = createAsyncThunk(
  'document/fetchApiData',
  async (payload, { dispatch }) => {
    console.log('fetchApiDataAction', payload)
    dispatch(changeApiDataAction(initialData))
  },
)

const introductionSlice = createSlice({
  name: 'document',
  initialState: {
    apiData: initialData,
  },
  reducers: {
    changeApiDataAction(state, { payload }) {
      state.apiData = payload
    },
  },
})

export const { changeApiDataAction } = introductionSlice.actions
export default introductionSlice.reducer
