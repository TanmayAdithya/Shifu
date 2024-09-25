import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { Todo, TodosState } from "@/types/types";

export const fetchTasks = createAsyncThunk<Todo[] | undefined>(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        console.log("Error fetching tasks");
      }
      const data: Todo[] = await response.json();

      return data;
    } catch (error) {
      console.log("Error", error);
      return undefined;
    }
  },
);

const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.unshift({
        id: nanoid(),
        content: action.payload,
        status: "todo",
      });
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        if (todo.status === "todo") {
          todo.status = "complete";
        } else {
          todo.status = "todo";
        }
      }
    },

    updateTodo: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.content = action.payload.content;
      }
    },

    setInProgress: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = "in-progress";
      }
    },

    toggleUrgency: (
      state,
      action: PayloadAction<{ id: string; urgent: boolean }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.urgent = action.payload.urgent;
      }
    },

    toggleImportance: (
      state,
      action: PayloadAction<{ id: string; important: boolean }>,
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.important = action.payload.important;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<Todo[] | undefined>) => {
          state.status = "succeeded";
          if (action?.payload) {
            state.todos = action.payload;
          }
        },
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const {
  addTodo,
  removeTodo,
  completeTodo,
  updateTodo,
  setInProgress,
  toggleUrgency,
  toggleImportance,
} = todoSlice.actions;

export default todoSlice.reducer;
