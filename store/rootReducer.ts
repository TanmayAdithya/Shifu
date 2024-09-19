import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import widgetReducer from "@/store/slices/widgetSlice";
import notesReducer from "@/store/slices/notesSlice";
import kanbanReducer from "./slices/kanbanSlice";
import calendarReducer from "./slices/calendarSlice";
import backgroundReducer from "./slices/backgroundSlice";
import youtubeReducer from "./slices/youtubeSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  widgets: widgetReducer,
  notes: notesReducer,
  kanban: kanbanReducer,
  calendar: calendarReducer,
  background: backgroundReducer,
  youtube: youtubeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
