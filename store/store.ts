import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import rootReducer, { RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
