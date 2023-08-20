import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

import type { IAPIInfo } from '@/types/api'
import { NavType } from '@/types/enum'
import { getRangeRandom } from '@/utils/math'

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
  'mock/fetchApiData',
  async (_, { dispatch }) => {
    dispatch(changeRunData(initialData))
    dispatch(changeMockData(cloneDeep(initialData)))
  },
)

const mockSlice = createSlice({
  name: 'mock',
  initialState: {
    runData: initialData,
    mockMode: 'mock',
    // 始终符合document定义的api信息（用于Mock模式）
    mockData: cloneDeep(initialData),
  },
  reducers: {
    changeRunData(state, { payload }) {
      state.runData = payload
    },
    changeMockData(state, { payload }) {
      state.mockData = payload
    },
    changeNormalParamsAction(state, { payload }: NormalParamsActionType) {
      const dataSource =
        state.mockMode === 'run' ? state.runData : state.mockData

      const { key, value, index, paramType } = payload
      switch (paramType) {
        case NavType.Params:
          dataSource.apiInfo.request.params[index][key] = value
          break
        case NavType.Header:
          dataSource.apiInfo.request.headers[index][key] = value
          break
        case NavType.Cookie:
          dataSource.apiInfo.request.cookie[index][key] = value
          break
      }
    },
    changeBodyAction(state, { payload }) {
      if (state.mockMode === 'run') {
        state.runData.apiInfo.request.body = payload
      } else {
        state.mockData.apiInfo.request.body = payload
      }
    },
    changeMethodAction(state, { payload }) {
      if (state.mockMode === 'run') {
        state.runData.apiInfo.base.method = payload
      } else {
        state.mockData.apiInfo.base.method = payload
      }
    },
    changePathAction(state, { payload }) {
      if (state.mockMode === 'run') {
        state.runData.apiInfo.base.path = payload
      } else {
        state.mockData.apiInfo.base.path = payload
      }
    },
    changePrefixAction(state, { payload }) {
      if (state.mockMode === 'run') {
        state.runData.apiInfo.base.prefix = payload
      } else {
        state.mockData.apiInfo.base.prefix = payload
      }
    },
    changeParamsItemOptAction(state, { payload }: ParamsOptActionType) {
      const dataSource =
        state.mockMode === 'run' ? state.runData : state.mockData

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
        dataSource.apiInfo.request[key].push({
          paramName: '',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: Date.now(),
        })
      } else {
        dataSource.apiInfo.request[key].splice(removeIndex, 1)
      }
    },
    changeMockModeAction(state, { payload }) {
      state.mockMode = payload
    },
  },
})

export const {
  changeRunData,
  changeMockData,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
  changeBodyAction,
  changeNormalParamsAction,
  changeParamsItemOptAction,
  changeMockModeAction,
} = mockSlice.actions
export default mockSlice.reducer
