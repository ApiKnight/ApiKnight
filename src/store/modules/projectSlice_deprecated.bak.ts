/**
 * 操作说明：文件废弃，所有操作转移到 @/store/project/index.ts
 * 操作原因：
 * 1. 项目信息整合到同一个模块中，使用文件夹管理一个模块，因为使用ts开发模块可能涉及类型
 * 2. 原有项目存储的数据结构不合理，需要存储项目信息，避免别的 页面/子页面 获取项目信息时，需要重新发起请求，带来性能和延时问题
 * 操作人：luoking(朱映华)
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '../../api/request'
import { message } from 'antd'
export interface ProjectIdType {
  project_id: string
}

const initialState: ProjectIdType = {
  project_id: '',
}

// export const fetchProjectList = createAsyncThunk(
// createAsyncThunk的第一个参数是动作的名称，Redux动作名称的标准惯例是'[slice name]/[action name]' ，例如('auth/login')
//   'fetchProjectList',
//   async () => {
//     const response = await request.get('holiday/single/20181121', {
//       params: {
//         ignoreHoliday: false,
//         app_id: 'bolpgeq7pltiflnj',
//         app_secret: 'd0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09',
//       },
//     })
//     return response.data
//   },
// )

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateProjectId: (state, action) => {
      state.project_id = action.payload.project_id
    },
  },
  extraReducers: (builder) => {
    // // Add reducers for additional action types here, and handle loading state as needed
    // builder.addCase(fetchProjectList.pending, (state, action) => {
    //   // Add user to the state array
    //   // state.projectList.push(action.payload)
    //   console.log('异步请求开始,fetchProjectList.pending')
    // })
    // builder.addCase(fetchProjectList.fulfilled, (state, action) => {
    //   // Add user to the state array
    //   // state.projectList.push(action.payload)
    //   console.log('异步请求完成,fetchProjectList.fulfilled')
    // })
  },
})

export const { updateProjectId } = projectSlice.actions
export default projectSlice.reducer
