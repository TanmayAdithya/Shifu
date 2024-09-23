import { VideosState, Videos } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VideosState = {
  videos: [],
  status: "idle",
  error: null,
};

export const fetchVideos = createAsyncThunk<Videos[] | undefined>(
  "videos/fetchVideos",
  async () => {
    try {
      const response = await fetch("/api/youtube/channels");
      if (!response.ok) {
        console.log("Error fetching tasks");
      }
      const data = await response.json();
      console.log("API Data: ", data);
      return data;
    } catch (error) {
      console.log("Error", error);
      return undefined;
    }
  },
);

export const youtubeSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchVideos.fulfilled,
        (state, action: PayloadAction<Videos[] | undefined>) => {
          state.status = "succeeded";
          if (action.payload) {
            state.videos = action.payload;
          }
        },
      )
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch videos";
      });
  },
});

export default youtubeSlice.reducer;
