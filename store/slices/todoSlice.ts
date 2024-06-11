import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  content: string;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
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
      state.todos.filter((todo) => {
        todo.id !== action.payload;
      });
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
