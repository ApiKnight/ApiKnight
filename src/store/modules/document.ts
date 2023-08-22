import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'
import { getInitialApiInfoObj } from '@/utils/documents'
import { getFullApiData } from '@/api/document'
import { getUserInfoById } from '@/api/user'
import { IUserInfo } from '@/api/user/type'

const initialData: IAPIInfo = getInitialApiInfoObj('unknown')

// 获取文档相关的数据
export const fetchDocumentApiAction = createAsyncThunk(
  'document/fetchDocumentApiAction',
  async (apiId: string, { dispatch }) => {
    try {
      // 获取文档信息
      const res = await getFullApiData(apiId)
      const apiData: IAPIInfo = JSON.parse(res.request_data)
      const { id, name, folder_id, create_user, description } = res
      apiData.meta_info.api_id = id
      apiData.meta_info.name = name
      apiData.meta_info.folder_id = folder_id
      apiData.meta_info.description = description
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

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    apiData: initialData,
    apiId: '',
    ownerUser: {} as IUserInfo,
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
} = documentSlice.actions
export default documentSlice.reducer
