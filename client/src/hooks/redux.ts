import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelectors: TypedUseSelectorHook<RootState> = useSelector