import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ProjectIdType {
  user_id: string
  user_name: string
}

const initialState: ProjectIdType = {
  user_id: '',
  user_name: '',
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
  extraReducers: (_builder) => {},
})

export default userSlice.reducer
