import { background } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchDefaultBackgrounds = createAsyncThunk<
  background[] | undefined
>("backgrounds/fetchDefaultBackgrounds", async () => {
  try {
    const response = await fetch("/api/unsplash");
    if (!response.ok) {
      console.log("Error fetching backgrounds");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
    return undefined;
  }
});

export const fetchSearchBackgrounds = createAsyncThunk<
  { backgrounds: background[]; totalPages: number },
  { query: string; page: number }
>("backgrounds/fetchSearchBackgrounds", async ({ query, page }) => {
  try {
    const url = `/api/unsplash/search?q=${query}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch search backgrounds");
    }

    const data = await response.json();

    return {
      backgrounds: data.results,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching search backgrounds:", error);
    throw error;
  }
});

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
        state.backgrounds = action.payload || [];
      })
      .addCase(fetchDefaultBackgrounds.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch default backgrounds";
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
        state.error = "Failed to fetch search backgrounds";
      });
  },
});

export const { setBackgroundImage, setBackgroundVideo } =
  backgroundSlice.actions;
export default backgroundSlice.reducer;
