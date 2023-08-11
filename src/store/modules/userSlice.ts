// ((loginData = {
//     usernameOrEmail: values.log_username,
//     password: values.log_password,
//     remember: values.remember
//   }),

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '../../api/request'
import { message } from 'antd'

const [messageApi] = message.useMessage()

export interface ProjectIdType {
  userId: string
  userName: string
}

const initialState: ProjectIdType = {
  userId: '',
  userName: '',
}

export const login = createAsyncThunk(
  //   createAsyncThunk的第一个参数是动作的名称，Redux动作名称的标准惯例是'[slice name]/[action name]' ，例如('auth/login')
  'user/login',
  async () => {},
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

// export const {updateProjectId} = userSlice.actions
export default userSlice.reducer
