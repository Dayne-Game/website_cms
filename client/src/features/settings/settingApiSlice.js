import { apiSlice } from "../../app/api/apiSlice";
import { setSettings } from "./settingSlice";

export const settingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSettings: builder.query({
            query: () => ({
                url: '/api/v1/settings',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log('data', data)
                    dispatch(setSettings(data))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        updateSettings: builder.mutation({
            query: settings => ({
                url: '/api/v1/settings',
                method: 'PUT',
                body: { ...settings }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(setSettings(data))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        createSettings: builder.mutation({
            query: settings => ({
                url: '/api/v1/settings',
                method: 'POST',
                body: { ...settings }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(setSettings(data))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
    useCreateSettingsMutation
} = settingApiSlice