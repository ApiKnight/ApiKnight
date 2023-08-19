import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { NavType } from '@/types/enum'

type NormalParamsActionType = {
  payload: {
    key: 'value' | 'paramName'
    value: string
    index: number
    paramType: NavType
  }
}

type ParamsOptActionType = {
  payload: { isInsert: boolean; removeIndex: number; paramType: NavType }
}

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
  'mock/fetchApiData',
  async (_, { dispatch }) => {
    dispatch(changeApiDataAction(initialData))
  },
)

const mockSlice = createSlice({
  name: 'mock',
  initialState: {
    apiData: initialData,
    mockMode: 'mock',
  },
  reducers: {
    changeApiDataAction(state, { payload }) {
      state.apiData = payload
    },
    changeNormalParamsAction(state, { payload }: NormalParamsActionType) {
      const { key, value, index, paramType } = payload
      switch (paramType) {
        case NavType.Params:
          state.apiData.apiInfo.request.params[index][key] = value
          break
        case NavType.Header:
          state.apiData.apiInfo.request.headers[index][key] = value
          break
        case NavType.Cookie:
          state.apiData.apiInfo.request.cookie[index][key] = value
          break
      }
    },
    changeBodyAction(state, { payload }) {
      state.apiData.apiInfo.request.body = payload
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
    changeParamsItemOptAction(state, { payload }: ParamsOptActionType) {
      const { isInsert, removeIndex, paramType } = payload
      let key: 'params' | 'headers' | 'cookie' = 'params'
      switch (paramType) {
        case NavType.Params:
          key = 'params'
          break
        case NavType.Header:
          key = 'headers'
          break
        case NavType.Cookie:
          key = 'cookie'
          break
      }
      if (isInsert) {
        state.apiData.apiInfo.request[key].push({
          paramName: `参数${state.apiData.apiInfo.request[key].length + 1}`,
          type: 'string',
          desc: '',
          required: false,
          value: '',
        })
      } else {
        state.apiData.apiInfo.request[key].splice(removeIndex, 1)
      }
    },
    changeMockModeAction(state, { payload }) {
      state.mockMode = payload
    },
  },
})

export const {
  changeApiDataAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
  changeBodyAction,
  changeNormalParamsAction,
  changeParamsItemOptAction,
  changeMockModeAction,
} = mockSlice.actions
export default mockSlice.reducer
