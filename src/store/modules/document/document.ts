import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getInitialApiInfoObj } from '@/utils/documents'
import { getFullApiData, updateApi } from '@/api/apis'
import { getUserInfoById } from '@/api/user'
import { IUserInfo } from '@/api/user/type'
import { store } from '@/store'
import { NavType } from '@/types/enum'
import { getRangeRandom } from '@/utils/math'
import { NormalParamsActionType, ParamsOptActionType } from '../../type'
import { UpdateStatusActionType } from './type'
import { increment } from '../watchDir'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取文档相关的数据
export const fetchDocumentApiAction = createAsyncThunk(
  'document/fetchDocumentApiAction',
  async (apiId: string, { dispatch }) => {
    const currentState = store.getState().document
    if (apiId === currentState.apiId) {
      return
    }
    try {
      // 获取文档信息
      const res = await getFullApiData(apiId)
      const apiData: IAPIInfo = JSON.parse(res.request_data)
      const { id, name, folder_id, create_user, description } = res
      apiData.meta_info.api_id = id
      apiData.meta_info.name = name
      apiData.meta_info.folder_id = folder_id
      // apiData.meta_info.desc = description
      // 获取用户信息
      const ownerInfo = await getUserInfoById(create_user)
      dispatch(changeUserInfoAction(ownerInfo))
      dispatch(changeApiDataAction(apiData))
      dispatch(changeApiIdAction(res.id))
    } catch (err) {
      console.log('出错了')

      console.log(err)
    }
  },
)

// 更新文档相关数据
export const updateDocumentApiAction = createAsyncThunk(
  'document/updateDocumentApiAction',
  async (notes: string, { dispatch }) => {
    const state = store.getState().document
    dispatch(
      changeUpdateStatusAction({
        onUpdating: true,
        onUploading: true,
      }),
    )
    const res = await updateApi({
      apiId: state.apiId,
      folderId: state.apiData.meta_info.folder_id,
      name: state.apiData.meta_info.name,
      desc: state.apiData.meta_info.desc,
      notes: notes,
      apiData: state.apiData,
      responseData: JSON.stringify(state.apiData.apiInfo.response),
    })
    dispatch(
      changeUpdateStatusAction({
        onUpdating: false,
        onUploading: false,
      }),
    )
    if (res.code === 200) {
      console.log('更新成功')
      dispatch(fetchDocumentApiAction(state.apiId))
      dispatch(increment())
    }
    // console.log(res, res.code, res.code === 200)
  },
)

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    apiData: initialData,
    apiId: '',
    folderId: '',
    projectId: '',
    operateTime: '',
    create_time: '',
    apiName: '',
    ownerUser: {} as IUserInfo,
    // 开始更新（动作上）
    onUpdating: false,
    // 正在向服务器发送请求
    onUploading: false,
  },
  reducers: {
    changeUserInfoAction(state, { payload }) {
      state.ownerUser = payload
    },
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
    changeApiNameAction(state, { payload }) {
      state.apiData.meta_info.name = payload
    },
    changeApiDescAction(state, { payload }) {
      state.apiData.meta_info.desc = payload
    },
    changeDevStatusAction(state, { payload }) {
      state.apiData.meta_info.status = payload
    },
    changeTagsAction(state, { payload }) {
      state.apiData.meta_info.tags = payload
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
          paramName: '',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: new Date().getTime() + getRangeRandom(1, 1000),
        })
      } else {
        state.apiData.apiInfo.request[key].splice(removeIndex, 1)
      }
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
    changeRequestBodyAction(state, { payload }) {
      state.apiData.apiInfo.request.body = payload
    },
    changeResponseBodyAction(state, { payload }) {
      console.log(payload)

      state.apiData.apiInfo.response.body = payload
    },
    changeUpdateStatusAction(state, { payload }: UpdateStatusActionType) {
      if (payload.onUpdating !== undefined)
        state.onUpdating = payload.onUpdating
      if (payload.onUploading !== undefined)
        state.onUploading = payload.onUploading
    },
  },
})

export const {
  changeApiIdAction,
  changeApiDataAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
  changeUserInfoAction,
  changeApiNameAction,
  changeApiDescAction,
  changeDevStatusAction,
  changeTagsAction,
  changeParamsItemOptAction,
  changeNormalParamsAction,
  changeRequestBodyAction,
  changeResponseBodyAction,
  changeUpdateStatusAction,
} = documentSlice.actions
export default documentSlice.reducer
