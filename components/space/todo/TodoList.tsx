import TodoItem from "./TodoItem";
import React from "react";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  return (
    <ul className="relative h-[256px] space-y-2 overflow-y-scroll">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          content={todo.content}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
