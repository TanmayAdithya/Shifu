import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { background } from "@/types/types";
import defaultBackgrounds from "@/json/defaultBackgrounds.json";

interface BackgroundState {
  active: "image" | "video";
  mediaRef: string;
  name?: string | null;
  portfolio_url?: string | null;
  backgrounds: background[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchDefaultBackgrounds = createAsyncThunk<
  background[],
  void,
  { rejectValue: string }
>("backgrounds/fetchDefaultBackgrounds", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      alert("Rate limit exceeded. Showing placeholder data.");
      return defaultBackgrounds;
    }
    console.error("Error fetching default backgrounds: ", error);
    return rejectWithValue("Failed to fetch default backgrounds");
  }
});

export const fetchSearchBackgrounds = createAsyncThunk<
  { backgrounds: background[]; totalPages: number },
  { query: string; page: number },
  { rejectValue: string }
>(
  "backgrounds/fetchSearchBackgrounds",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            page,
            client_id: apiKey,
          },
        },
      );
      return {
        backgrounds: response.data.results,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      console.error("Error fetching search backgrounds:", error);
      return rejectWithValue("Failed to fetch search backgrounds");
    }
  },
);

const initialState: BackgroundState = {
  active: "image",
  mediaRef:
    "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MTM4Njh8MHwxfHNlYXJjaHw1Nnx8TmF0dXJlfGVufDB8fHx8MTcyNjM5NzYyNHww&ixlib=rb-4.0.3&q=85",
  name: "kazuend",
  portfolio_url: "https://unsplash.com/@kazuend",
  backgrounds: [],
  loading: false,
  error: null,
  totalPages: 0,
};

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    setBackgroundImage: (
      state,
      action: PayloadAction<{
        active: string;
        mediaRef: string;
        name: string;
        portfolio_url: string;
      }>,
    ) => {
      state.mediaRef = action.payload.mediaRef;
      state.name = action.payload.name;
      state.portfolio_url = action.payload.portfolio_url;
      state.active = "image";
    },
    setBackgroundVideo: (state, action: PayloadAction<string>) => {
      state.active = "video";
      state.mediaRef = action.payload;
      state.name = null;
      state.portfolio_url = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultBackgrounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultBackgrounds.fulfilled, (state, action) => {
        state.loading = false;
        state.backgrounds = action.payload;
      })
      .addCase(fetchDefaultBackgrounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch default backgrounds";
      });

    builder
      .addCase(fetchSearchBackgrounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchBackgrounds.fulfilled, (state, action) => {
        state.loading = false;
        state.backgrounds = action.payload.backgrounds;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchBackgrounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch search backgrounds";
      });
  },
});

export const { setBackgroundImage, setBackgroundVideo } =
  backgroundSlice.actions;
export default backgroundSlice.reducer;
