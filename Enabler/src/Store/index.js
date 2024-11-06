import { useDispatch, useSelector } from "react-redux"
import { Appconfig } from "./Reducer/appconfig";


export const useStore = () => {
    const Dispatch = useDispatch();
    const APP_CONFIG = useSelector((store) => store.APP_CONFIG);
    return {
        APP_CONFIG,
        SetAppConfig: (value) => Dispatch(Appconfig.actions.updateValue(value)),
    }
}