/**
 * 操作说明：文件废弃，所有操作转移到 @/store/project/index.ts
 * 操作原因：
 * 1. 项目信息整合到同一个模块中，使用文件夹管理一个模块，因为使用ts开发模块可能涉及类型
 * 2. 原有项目存储的数据结构不合理，需要存储项目信息，避免别的 页面/子页面 获取项目信息时，需要重新发起请求，带来性能和延时问题
 * 操作人：luoking(朱映华)
 */

import { createSlice } from '@reduxjs/toolkit'

export interface ProjectIdType {
  project_id: string
}

const initialState: ProjectIdType = {
  project_id: '',
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    updateProjectId: (state, action) => {
      state.project_id = action.payload.project_id
    },
  },
  extraReducers: (_builder) => {},
})

export const { updateProjectId } = projectSlice.actions
export default projectSlice.reducer
