import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isGlassMode: boolean;
}

const loadInitialState = (): ThemeState => {
  const storedValue = localStorage.getItem("isGlassMode");
  return {
    isGlassMode: storedValue === "true",
  };
};

const initialState: ThemeState = loadInitialState();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleGlassMode: (state, action) => {
      state.isGlassMode = action.payload;
      localStorage.setItem("isGlassMode", JSON.stringify(action.payload));
    },
  },
});

export const { toggleGlassMode } = themeSlice.actions;
export default themeSlice.reducer;
