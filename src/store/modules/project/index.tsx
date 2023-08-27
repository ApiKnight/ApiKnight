import { getProjectInfoById } from '@/api/project'
import { IFolderInfo, IRawApiInfo, IUserInfo } from '@/api/project/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// 获取项目inxi
export const fetchProjectInfoAction = createAsyncThunk(
  'project/fetchProjectInfoAction',
  async (projectId: number, { dispatch }) => {
    if (projectId) {
      const projectInfo = await getProjectInfoById(projectId)
      dispatch(changeProjectInfo(projectInfo))
    }
  },
)

// 当前项目的模块
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    // 项目信息
    projectInfo: {
      api_list: [] as IRawApiInfo[],
      create_user: {} as IUserInfo,
      description: '项目描述',
      folder_list: [] as IFolderInfo[],
      id: -1,
      project_img: '#',
      projectname: 'project_name',
      role: -1,
    },
    project_id: '',
  },
  reducers: {
    changeProjectInfo(state, { payload }) {
      state.projectInfo = payload
    },
    updateProjectId: (state, action) => {
      state.project_id = action.payload.project_id
    },
  },
})

export const { changeProjectInfo, updateProjectId } = projectSlice.actions
export default projectSlice.reducer
