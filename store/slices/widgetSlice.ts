import { OpenWidgetsState, WidgetPosition, WidgetState } from "@/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const defaultWidgets: WidgetState[] = [
  { id: "Notes", visibility: false, position: { x: 120, y: 120 }, order: 0 },
  { id: "Timer", visibility: false, position: { x: 423, y: 217 }, order: 1 },
  { id: "Todo", visibility: false, position: { x: 858, y: 204 }, order: 2 },
  { id: "Calendar", visibility: false, position: { x: 300, y: 300 }, order: 3 },
  { id: "Kanban", visibility: false, position: { x: 481, y: 352 }, order: 4 },
  { id: "Music", visibility: false, position: { x: 502, y: 250 }, order: 5 },
];

const initialState: OpenWidgetsState = {
  widgets: defaultWidgets,
  status: "idle",
  error: null,
};

const STORAGE_KEY = "user_widgets";

export const loadWidgets = createAsyncThunk("widgets/loadWidgets", async () => {
  const storedWidgets = localStorage.getItem(STORAGE_KEY);
  if (storedWidgets) {
    const parsedWidgets = JSON.parse(storedWidgets) as WidgetState[];
    return defaultWidgets.map((defaultWidget) => {
      const storedWidget = parsedWidgets.find((w) => w.id === defaultWidget.id);
      return storedWidget
        ? { ...defaultWidget, ...storedWidget }
        : defaultWidget;
    });
  }
  return defaultWidgets;
});

export const saveWidgets = createAsyncThunk(
  "widgets/saveWidgets",
  async (widgets: WidgetState[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    return widgets;
  },
);

export const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<string>) => {
      const widgetId = action.payload;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.visibility = !widget.visibility;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.widgets));
      }
    },
    updatePosition: (state, action: PayloadAction<WidgetPosition>) => {
      const widgetId = action.payload.id;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.position = action.payload.position;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.widgets));
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

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.widgets));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWidgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadWidgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.widgets = action.payload;
      })
      .addCase(loadWidgets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(saveWidgets.fulfilled, (state, action) => {
        state.widgets = action.payload;
      });
  },
});

export const { toggleWidget, updatePosition, bringWidgetToTop } =
  widgetSlice.actions;

export default widgetSlice.reducer;
