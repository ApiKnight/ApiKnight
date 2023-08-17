import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TabSlice {
    data: [
        {
            key: string,
            name: string,
            type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
        }
    ],
}

const initialState: TabSlice = {
    data: [
        {
            key: "",
            name: "",
            type: 'GET'
        }
    ]
}

const tabSlice = createSlice({
    name: "tabSlice",
    initialState,
    reducers: {
        assign(state, action: PayloadAction<Array<TabSlice>>) {
            state.data = action.payload
        },
        removeData(state,action: PayloadAction<string>) {
            state.data = state.data.filter((item)=>{
                return item.key !== action.payload
            })
        },
        addData(state,action: PayloadAction<TabSlice>) {
            const temp = state.data
            temp.push(action.payload)
            state.data =  temp.filter((value, index, self) => {
                const jsonValue = JSON.stringify(value);
                return index === self.findIndex(obj => {
                    return JSON.stringify(obj) === jsonValue;
                });
            });
        }
    }
})

export const { assign , removeData , addData } = tabSlice.actions

export default tabSlice.reducer
