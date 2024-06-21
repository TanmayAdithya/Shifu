import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import widgetReducer from "@/store/slices/widgetSlice";
import notesReducer from "@/store/slices/notesSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  widgets: widgetReducer,
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
