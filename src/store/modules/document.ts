import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getInitialApiInfoObj } from '@/utils/documents'
import { getFullApiData } from '@/api/document'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取接口数据
export const fetchDocumentApiAction = createAsyncThunk(
  'document/fetchDocumentApiAction',
  async (apiId: string, { dispatch }) => {
    const res = await getFullApiData(apiId)
    try {
      const apiData: IAPIInfo = JSON.parse(res.request_data)
      apiData.meta_info.api_id = res.id
      apiData.meta_info.name = res.name
      apiData.meta_info.folder_id = res.folder_id
      apiData.meta_info.description = res.description
      dispatch(changeApiDataAction(apiData))
      dispatch(changeApiIdAction(res.id))
    } catch (err) {
      console.log('出错了')

      console.log(err)
    }
  },
)

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    apiData: initialData,
    apiId: '',
  },
  reducers: {
    changeApiIdAction(state, { payload }) {
      state.apiId = payload
    },
    changeApiDataAction(state, { payload }) {
      state.apiData = payload
    },
    changeMethodAction(state, { payload }) {
      state.apiData.apiInfo.base.method = payload
    },
    changePathAction(state, { payload }) {
      state.apiData.apiInfo.base.path = payload
    },
    changePrefixAction(state, { payload }) {
      state.apiData.apiInfo.base.prefix = payload
    },
  },
})

export const {
  changeApiIdAction,
  changeApiDataAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
} = documentSlice.actions
export default documentSlice.reducer
