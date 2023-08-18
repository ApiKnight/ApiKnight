import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CreateFileValue {
    value: {
        project_id: number,
        parent_id: string,
    }
}

const initialState: CreateFileValue = {
    value: {
        project_id: 0,
        parent_id: ""
    },
}

export const createFileSlice = createSlice({
    name: 'createFileSlice',
    initialState,
    reducers: {
        setValue(state,action: PayloadAction<CreateFileValue>) {
            state.value = action.payload
        }
    },
})

export const { setTrue, setFalse, reversal } = createFileSlice.actions

export default createFileSlice.reducer
