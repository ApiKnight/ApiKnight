import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

import type { IAPIInfo } from '@/types/api'
import { NavType } from '@/types/enum'
import { getRangeRandom } from '@/utils/math'
import { getApiData } from '@/api/apis'
import { getInitialApiInfoObj } from '@/utils/documents'
import { NormalParamsActionType, ParamsOptActionType } from './type'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取接口数据
export const fetchApiDataAction = createAsyncThunk(
  'mock/fetchApiData',
  async (apiId: string, { dispatch }) => {
    const apiData = await getApiData(apiId)
    dispatch(changeRunData(apiData))
    dispatch(changeMockData(cloneDeep(apiData)))
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
    changeRequestBodyAction(state, { payload }) {
      console.log(payload)

      if (state.mockMode === 'run') {
        state.runData.apiInfo.request.body = payload
      } else {
        state.mockData.apiInfo.request.body = payload
      }
    },
    changeResponseBodyAction(state, { payload }) {
      console.log(payload)

      if (state.mockMode === 'run') {
        state.runData.apiInfo.response.body = payload
      } else {
        state.mockData.apiInfo.response.body = payload
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
          paramName: 'ParamName',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: new Date().getTime() + getRangeRandom(1, 1000),
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
  changeRequestBodyAction,
  changeResponseBodyAction,
  changeNormalParamsAction,
  changeParamsItemOptAction,
  changeMockModeAction,
} = mockSlice.actions
export default mockSlice.reducer
