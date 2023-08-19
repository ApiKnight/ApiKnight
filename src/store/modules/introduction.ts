import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'

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
      path: '/exapmle/api',
      prefix: 'http://localhost:3000',
    },
    request: {
      params: [
        {
          paramName: 'paramstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'paramstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      headers: [
        {
          paramName: 'headerstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'headerstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      cookie: [
        {
          paramName: 'cookietestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'cookietestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      body: 'HelloWorld',
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
