import { createSlice } from '@reduxjs/toolkit'
import type { IAPIInfo } from '@/types/api'

const initialState: IAPIInfo = {
  meta_info: {
    created: '',
    status: '',
    owner_id: '',
    tags: [],
    desc: '',
  },
  apiInfo: {
    base: {
      method: 'GET',
      path: '/exapmle/api',
    },
    request: {
      params: [
        {
          paramName: 'paramstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'paramstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      headers: [
        {
          paramName: 'headerstestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'headerstestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      cookie: [
        {
          paramName: 'cookietestkey1',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
        {
          paramName: 'cookietestkey2',
          type: 'string',
          desc: '',
          required: false,
          value: '',
        },
      ],
      body: 'HelloWorld',
    },
    response: {
      status: 0,
      body: '',
    },
  },
}

const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {},
})

export const {} = documentSlice.actions
export default documentSlice.reducer
