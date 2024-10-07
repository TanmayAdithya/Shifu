import { WidgetPosition } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const previewWidgets = [
  { id: "preview-notes", position: { x: 127, y: 127 }, order: 0 },
  { id: "preview-timer", position: { x: 27, y: 17 }, order: 1 },
  { id: "preview-todo", position: { x: 400, y: 204 }, order: 2 },
];

const initialState = {
  widgets: previewWidgets,
  status: "idle",
  error: null,
};

export const previewSlice = createSlice({
  name: "previewWidgets",
  initialState,
  reducers: {
    updatePreviewPosition: (state, action: PayloadAction<WidgetPosition>) => {
      const widgetId = action.payload.id;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    bringPreviewWidgetToTop: (state, action: PayloadAction<string>) => {
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

export const { updatePreviewPosition, bringPreviewWidgetToTop } =
  previewSlice.actions;

export default previewSlice.reducer;
