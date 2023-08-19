import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getRangeRandom } from '@/utils/math'

const initialData: IAPIInfo = {
  meta_info: {
    created: '',
    status: '',
    owner_id: '',
    tags: [],
    desc: '',
  },
  apiInfo: {
    base: {
      method: 'GET',
      path: '',
      prefix: '',
    },
    request: {
      params: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: getRangeRandom(1000, 9999),
        },
      ],
      headers: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: getRangeRandom(1000, 9999),
        },
      ],
      cookie: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: getRangeRandom(1000, 9999),
        },
      ],
      body: '{}',
    },
    response: {
      status: 0,
      body: '',
    },
  },
}

// 获取接口数据
export const fetchApiDataAction = createAsyncThunk(
  'document/fetchApiData',
  async (payload: any, { dispatch }) => {
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
