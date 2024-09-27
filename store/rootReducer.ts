import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import widgetReducer from "@/store/slices/widgetSlice";
import notesReducer from "@/store/slices/notesSlice";
import kanbanReducer from "./slices/kanbanSlice";
import calendarReducer from "./slices/calendarSlice";
import backgroundReducer from "./slices/backgroundSlice";
import youtubeReducer from "./slices/youtubeSlice";
import themeReducer from "./slices/themeSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  widgets: widgetReducer,
  notes: notesReducer,
  kanban: kanbanReducer,
  calendar: calendarReducer,
  background: backgroundReducer,
  youtube: youtubeReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
