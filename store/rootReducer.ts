import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import widgetReducer from "@/store/slices/widgetSlice";
import notesReducer from "@/store/slices/notesSlice";
import kanbanReducer from "./slices/kanbanSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  widgets: widgetReducer,
  notes: notesReducer,
  kanban: kanbanReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
