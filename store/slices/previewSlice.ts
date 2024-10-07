import { Todo, WidgetPosition } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const previewWidgets = [
  { id: "preview-notes", position: { x: 33, y: 25 }, order: 0 },
  { id: "preview-timer", position: { x: 385, y: 74 }, order: 1 },
  { id: "preview-todo", position: { x: 202, y: 400 }, order: 2 },
];

export const dummyTodos = [
  {
    _id: "1",
    content: "Complete project proposal",
    status: "todo",
    important: true,
    urgent: false,
  },
  {
    _id: "2",
    content: "Buy groceries",
    status: "complete",
    important: false,
    urgent: false,
  },
  {
    _id: "3",
    content: "Call mom",
    status: "in-progress",
    important: false,
    urgent: true,
  },
];

const initialState = {
  widgets: previewWidgets,
  todos: dummyTodos,
  status: "idle",
  error: null,
};

export const previewSlice = createSlice({
  name: "previewWidgets",
  initialState,
  reducers: {
    updatePreviewPosition: (state, action: PayloadAction<WidgetPosition>) => {
      const widgetId = action.payload.id;
      const widget = state.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    bringPreviewWidgetToTop: (state, action: PayloadAction<string>) => {
      const MAX_Z_INDEX = 40;

      const widgetId = action.payload;

      state.widgets.forEach((widget) => {
        if (widget.id === widgetId) {
          widget.order = MAX_Z_INDEX;
        } else {
          widget.order = 20;
        }
      });
    },
    addTodo: (state, action: PayloadAction<{ content: string }>) => {
      const newTodo: Todo = {
        _id: Math.random().toString(),
        content: action.payload.content,
        status: "todo",
        important: false,
        urgent: false,
      };
      state.todos.unshift(newTodo as any);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ _id: string; updates: Partial<Todo> }>,
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id,
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.status = todo.status === "complete" ? "todo" : "complete";
      }
    },
    updateTodoLabel: (
      state,
      action: PayloadAction<{ _id: string; updates: Partial<Todo> }>,
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id,
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload.updates,
        };
      }
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  updatePreviewPosition,
  bringPreviewWidgetToTop,
  updateTodoLabel,
} = previewSlice.actions;

export default previewSlice.reducer;
