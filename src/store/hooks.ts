import { useDispatch, useSelector,TypedUseSelectorHook  } from "react-redux";
import { RootState,AppDispatch } from "./store";


export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for useSelector with typed RootState
export const useAppUseSelector: TypedUseSelectorHook<RootState> = useSelector;