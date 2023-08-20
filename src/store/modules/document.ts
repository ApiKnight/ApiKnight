import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getInitialApiInfoObj } from '@/utils/documents'
import { getApiData } from '@/api/document'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取接口数据
export const fetchApiDataAction = createAsyncThunk(
  'document/fetchApiData',
  async (apiId: string, { dispatch }) => {
    const apiData = await getApiData(apiId)
    dispatch(changeApiDataAction(apiData))
  },
)

const documentSlice = createSlice({
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

export const { changeApiDataAction } = documentSlice.actions
export default documentSlice.reducer
