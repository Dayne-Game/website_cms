import { useSelector } from "react-redux";
import { selectSettings } from "../features/settings/settingSlice";

const useSettings = () => {
    const settings = useSelector(selectSettings)

    if(settings) {
        return settings
    }

    return {}
}

export default useSettings