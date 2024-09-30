import TodoItem from "./TodoItem";
import React, { useEffect } from "react";
import { RootState } from "@/store/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/store/slices/todoSlice";
import { AppDispatch } from "@/store/store";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <ul className="relative h-[256px] space-y-2 overflow-y-scroll">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          _id={todo._id}
          content={todo.content}
          status={todo.status}
          important={todo.important}
          urgent={todo.urgent}
        />
      ))}
    </ul>
  );
};

export default TodoList;
