import { useAppSelector } from "@/store/store";
import TodoItem from "./TodoItem";
import React from "react";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todoReducer.todos);
  return (
    <ul className="relative h-[256px] space-y-2 overflow-y-scroll">
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} content={todo.content} />
      ))}
    </ul>
  );
};

export default TodoList;
