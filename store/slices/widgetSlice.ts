import { OpenWidgetsState, WidgetPosition } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: OpenWidgetsState = {
  widgets: [
    {
      id: "Notes",
      visibility: false,
      position: {
        x: 120,
        y: 120,
      },
    },
    {
      id: "Timer",
      visibility: false,
      position: {
        x: 423,
        y: 217,
      },
    },
    {
      id: "Todo",
      visibility: false,
      position: {
        x: 858,
        y: 204,
      },
    },
    {
      id: "Calendar",
      visibility: false,
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Kanban",
      visibility: false,
      position: {
        x: 481,
        y: 352,
      },
    },
    {
      id: "Matrix",
      visibility: false,
      position: {
        x: 532,
        y: 300,
      },
    },
  ],
};

export const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<string>) => {
      const widgetId = action.payload;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.visibility = !widget.visibility;
      }
    },
    updatePosition: (state, action: PayloadAction<WidgetPosition>) => {
      const widgetId = action.payload.id;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
  },
});

export const { toggleWidget, updatePosition } = widgetSlice.actions;

export default widgetSlice.reducer;
