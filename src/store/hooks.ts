import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useThunkAppDispatch = () => useDispatch<AppThunkDispatch>();
