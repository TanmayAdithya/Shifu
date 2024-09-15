import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackgroundState {
  url: string;
  name?: string;
  portfolio_url?: string;
}

const initialState: BackgroundState = {
  url: "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MTM4Njh8MHwxfHNlYXJjaHw1Nnx8TmF0dXJlfGVufDB8fHx8MTcyNjM5NzYyNHww&ixlib=rb-4.0.3&q=85",
  // https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MTM4Njh8MHwxfHNlYXJjaHw4OXx8TmF0dXJlfGVufDB8fHx8MTcyNjM5NzcxNnww&ixlib=rb-4.0.3&q=85
};

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<BackgroundState>) => {
      state.url = action.payload.url;
      state.name = action.payload.name;
      state.portfolio_url = action.payload.portfolio_url;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
