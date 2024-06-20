import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import widgetReducer from "@/store/slices/widgetSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  widgets: widgetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
