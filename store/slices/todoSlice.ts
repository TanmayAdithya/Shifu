import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { Todo, TodosState } from "@/types/types";

interface UpdateTodoPayload {
  _id: string;
  updates: Partial<Todo>;
}

export const fetchTasks = createAsyncThunk<Todo[]>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    } catch (error) {
      return rejectWithValue("Error fetching tasks");
    }
  },
);

export const addTask = createAsyncThunk<
  Todo,
  { content: string; urgent: boolean; important: boolean; status: string }
>("tasks/addTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    return response.json();
  } catch (error) {
    return rejectWithValue("Error creating task");
  }
});

export const updateTodoFields = createAsyncThunk(
  "tasks/updateTodoFields",
  async ({ _id, updates }: UpdateTodoPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const result = await response.json();
      return { _id, updates };
    } catch (error) {
      return rejectWithValue("Error updating task");
    }
  },
);

export const removeTask = createAsyncThunk<string, string>(
  "tasks/removeTask",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove task");
      }

      await response.json();
      return _id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Error removing task",
      );
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
        _id: nanoid(),
        content: action.payload,
        status: "todo",
      });
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.status = todo.status === "todo" ? "complete" : "todo";
      }
    },

    updateTodo: (
      state,
      action: PayloadAction<{ _id: string; content: string }>,
    ) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.content = action.payload.content;
      }
    },

    setInProgress: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.status = "in-progress";
      }
    },

    toggleUrgency: (
      state,
      action: PayloadAction<{ _id: string; urgent: boolean }>,
    ) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.urgent = action.payload.urgent;
      }
    },

    toggleImportance: (
      state,
      action: PayloadAction<{ _id: string; important: boolean }>,
    ) => {
      const todo = state.todos.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.important = action.payload.important;
      }
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{ _id: string; status: any }>,
    ) => {
      const task = state.todos.find((todo) => todo._id === action.payload._id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodoFields.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id,
        );
        if (index !== -1) {
          state.todos[index] = {
            ...state.todos[index],
            ...action.payload.updates,
          };
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
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
  updateTaskStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
