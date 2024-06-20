import { OpenWidgetsState } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: OpenWidgetsState = {
  widgets: {
    Notes: false,
    Timer: false,
    Todo: false,
    Kanban: false,
    Calendar: false,
    Matrix: false,
  },
};

export const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<string>) => {
      const widgetName = action.payload;
      state.widgets[widgetName] = !state.widgets[widgetName];
    },
  },
});

export const { toggleWidget } = widgetSlice.actions;

export default widgetSlice.reducer;
