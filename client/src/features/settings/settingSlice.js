import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
    name: 'setting',
    initialState: { settings: null },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload
        }
    }
})

export const { setSettings } = settingSlice.actions

export default settingSlice.reducer

export const selectSettings = (state) => state.setting.settings