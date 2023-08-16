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
