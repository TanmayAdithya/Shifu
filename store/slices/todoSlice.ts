import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { TodosState } from "@/types/types";

const initialState: TodosState = {
  todos: [
    {
      id: "1",
      content:
        "Buy groceries, including fruits, vegetables, dairy, and other essentials that are needed for the week.",
      completed: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: nanoid(),
        content: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
