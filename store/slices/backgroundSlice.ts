import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { background, BackgroundState } from "@/types/types";

const saveBackgroundToLocalStorage = (background: Partial<BackgroundState>) => {
  localStorage.setItem("userBackground", JSON.stringify(background));
};

const loadBackgroundFromLocalStorage = (): Partial<BackgroundState> | null => {
  const savedBackground = localStorage.getItem("userBackground");
  return savedBackground ? JSON.parse(savedBackground) : null;
};

const savedBackground = loadBackgroundFromLocalStorage();

export const fetchDefaultBackgrounds = createAsyncThunk<
  background[],
  void,
  { rejectValue: string }
>("backgrounds/fetchDefaultBackgrounds", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/unsplash/default");

    return response.data;
  } catch (error) {
    console.error("Error fetching default backgrounds:", error);

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        return rejectWithValue(
          "Rate limit exceeded. The search functionality is currently unavailable. Please try again in one hour.",
        );
      }
    }

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
      const response = await axios.get("/api/unsplash/search", {
        params: {
          query,
          page,
        },
      });
      return {
        backgrounds: response.data.backgrounds,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching search backgrounds:", error);

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          return rejectWithValue(
            "Rate limit exceeded. The search functionality is currently unavailable. Please try again in one hour.",
          );
        }
      }

      return rejectWithValue("Failed to fetch search backgrounds");
    }
  },
);

export const fetchCurrentBackground = createAsyncThunk<
  BackgroundState,
  void,
  { rejectValue: string }
>("backgrounds/fetchCurrentBackground", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/backgrounds");
    return response.data;
  } catch (error) {
    console.error("Error fetching current background:", error);
    return rejectWithValue("Failed to fetch current background");
  }
});

export const updateCurrentBackground = createAsyncThunk<
  void,
  Partial<BackgroundState>
>(
  "background/updateCurrentBackground",
  async (backgroundData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/backgrounds", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backgroundData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      saveBackgroundToLocalStorage({
        active: backgroundData.active,
        mediaRef: backgroundData.mediaRef,
        name: backgroundData.name,
        portfolio_url: backgroundData.portfolio_url,
      });

      return response.json();
    } catch (error) {
      console.error("Error updating background:", error);
      return rejectWithValue("Failed to update background");
    }
  },
);

const initialState: BackgroundState = {
  active: savedBackground?.active || "image",
  mediaRef:
    savedBackground?.mediaRef ||
    "https://images.unsplash.com/photo-1727294810277-5da030783146?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: savedBackground?.name || "Claudio Schwarz",
  portfolio_url:
    savedBackground?.portfolio_url || "https://unsplash.com/@purzlbaum",
  backgrounds: [],
  loading: false,
  mediaLoading: false,
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
      })
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
      })
      .addCase(fetchCurrentBackground.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentBackground.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaRef = action.payload.mediaRef;
        state.name = action.payload.name;
        state.portfolio_url = action.payload.portfolio_url;
        state.active = action.payload.active;
      })
      .addCase(fetchCurrentBackground.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch background";
      })
      .addCase(updateCurrentBackground.pending, (state) => {
        state.mediaLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentBackground.fulfilled, (state) => {
        state.loading = false;
        state.mediaLoading = false;
      })
      .addCase(updateCurrentBackground.rejected, (state, action) => {
        state.loading = false;
        state.mediaLoading = false;
        state.error =
          (action.payload as string) || "Failed to update background";
      });
  },
});

export const { setBackgroundImage, setBackgroundVideo } =
  backgroundSlice.actions;
export default backgroundSlice.reducer;
