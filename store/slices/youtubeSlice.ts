import { VideosState, Videos } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: VideosState = {
  videos: [],
  status: "idle",
  error: null,
};

export const fetchVideos = createAsyncThunk<Videos[] | undefined>(
  "videos/fetchVideos",
  async () => {
    return undefined;
  },
);

export const youtubeSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
});
