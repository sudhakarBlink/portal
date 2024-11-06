import { createSlice } from '@reduxjs/toolkit'


export const Appconfig = createSlice({
    name: 'counter',
    initialState: {
        sidebarWidth: 300
    },
    reducers: {
        updateValue(state, action) {
            state.sidebarWidth = action.payload
        }
    },
})
