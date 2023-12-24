import { useEffect } from "react";
import { store } from "../../app/store";
import { settingApiSlice } from "../settings/settingApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(settingApiSlice.util.prefetch('getSettings', 'settingsList', { force: true }))
    }, [])

    return <Outlet />

}

export default Prefetch