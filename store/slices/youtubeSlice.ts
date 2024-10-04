import { VideosState, Videos, SearchedVideo } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ambience from "@/json/ambience.json";
import study from "@/json/study.json";
import scifi from "@/json/scifi.json";
import cafe from "@/json/cafe.json";
import earth from "@/json/earth.json";
import relax from "@/json/relax.json";
import axios from "axios";

const initialState: VideosState = {
  videos: [],
  status: "idle",
  error: null,
  muted: true,
};

const placeholderVideos = [ambience, study, scifi, cafe, earth, relax];

export const fetchVideos = createAsyncThunk<Videos[] | undefined>(
  "videos/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/youtube/channels");

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return placeholderVideos;
        } else if (response.status >= 500) {
          return rejectWithValue("Server error. Please try again later.");
        } else {
          return rejectWithValue(
            "Failed to fetch videos. Please check your request.",
          );
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return rejectWithValue("Unexpected error occurred. Please try again.");
    }
  },
);

export const searchVideos = createAsyncThunk<
  SearchedVideo[] | undefined,
  { query: string }
>("videos/searchVideos", async ({ query }, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/youtube/search", {
      params: {
        q: query,
      },
    });

    const data = (await response.data.items) as SearchedVideo[];
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return rejectWithValue("Unexpected error occurred. Please try again.");
  }
});

export const youtubeSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    muteVideo: (state, action: PayloadAction<boolean>) => {
      state.muted = action.payload;
    },
  },
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
      })
      .addCase(searchVideos.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.videos = [];
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videos = action.payload as any;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to fetch searched videos";
      });
  },
});

export const { muteVideo } = youtubeSlice.actions;
export default youtubeSlice.reducer;
