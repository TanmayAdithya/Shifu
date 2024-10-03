import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isGlassMode: boolean;
}

const initialState: ThemeState = {
  isGlassMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleGlassMode: (state, action) => {
      state.isGlassMode = action.payload;
    },
  },
});

export const { toggleGlassMode } = themeSlice.actions;
export default themeSlice.reducer;
