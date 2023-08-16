import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TabSlice {
    data: {
        key: string,
        name: string,
        type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
    },
}

const initialState: TabSlice = {
    data: {
        key: "",
        name: "",
        type: 'GET'
    }
}

const tabSlice = createSlice({
    name: "tabSlice",
    initialState,
    reducers: {
        assign(state, action: PayloadAction<Array<TabSlice>>) {
            state.data = action.payload
        }
    }
})

export const { setTrue, setFalse, reversal } = tabSlice.actions

export default tabSlice.reducer
