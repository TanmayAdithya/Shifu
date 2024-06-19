import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { TodosState } from "@/types/types";

const initialState: TodosState = {
  todos: [
    {
      id: "1",
      content:
        "Buy groceries, including fruits, vegetables, dairy, and other essentials that are needed for the week.",
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
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
