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
      order: 0,
    },
    {
      id: "Timer",
      visibility: false,
      position: {
        x: 423,
        y: 217,
      },
      order: 1,
    },
    {
      id: "Todo",
      visibility: false,
      position: {
        x: 858,
        y: 204,
      },
      order: 2,
    },
    {
      id: "Calendar",
      visibility: false,
      position: {
        x: 300,
        y: 300,
      },
      order: 3,
    },
    {
      id: "Kanban",
      visibility: false,
      position: {
        x: 481,
        y: 352,
      },
      order: 4,
    },
    {
      id: "Matrix",
      visibility: false,
      position: {
        x: 532,
        y: 300,
      },
      order: 5,
    },
    {
      id: "Music",
      visibility: false,
      position: {
        x: 502,
        y: 250,
      },
      order: 6,
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
    bringWidgetToTop: (state, action: PayloadAction<string>) => {
      const MAX_Z_INDEX = 40;

      const widgetId = action.payload;

      state.widgets.forEach((widget) => {
        if (widget.id === widgetId) {
          widget.order = MAX_Z_INDEX;
        } else {
          widget.order = 20;
        }
      });
    },
  },
});

export const { toggleWidget, updatePosition, bringWidgetToTop } =
  widgetSlice.actions;

export default widgetSlice.reducer;
