import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
    name: 'setting',
    initialState: { settings: JSON.parse(localStorage.getItem('settings')) || null },
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload
            localStorage.setItem('settings', JSON.stringify(action.payload))
        }
    }
})

export const { setSettings } = settingSlice.actions

export default settingSlice.reducer

export const selectSettings = (state) => state.setting.settings