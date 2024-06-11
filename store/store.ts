import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";

export const store = configureStore({
  reducer: { todoReducer },
});
