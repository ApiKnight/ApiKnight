import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '../../api/request'
export interface Project {
  projectList: Array<Object>
}

const initialState: Project = {
  projectList: [],
}

export const fetchProjectList = createAsyncThunk(
  'fetchProjectList',
  async () => {
    const response = await request.get('holiday/single/20181121', {
      params: {
        ignoreHoliday: false,
        app_id: 'bolpgeq7pltiflnj',
        app_secret: 'd0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09',
      },
    })
    return response.data
  },
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProjectList.pending, (state, action) => {
      // Add user to the state array
      // state.projectList.push(action.payload)
      console.log('异步请求开始,fetchProjectList.pending')
    })
    builder.addCase(fetchProjectList.fulfilled, (state, action) => {
      // Add user to the state array
      // state.projectList.push(action.payload)
      console.log('异步请求完成,fetchProjectList.fulfilled')
    })
  },
})

export default projectSlice.reducer
