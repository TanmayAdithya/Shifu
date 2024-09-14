import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackgroundState {
  url: string;
}

const initialState: BackgroundState = {
  url: "/clay-banks-unsplash.jpg",
};

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
