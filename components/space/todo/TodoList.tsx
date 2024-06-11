import React from "react";
import TodoItem from "./TodoItem";

const todos = [
  {
    id: 1,
    content: "jello bean",
  },
  {
    id: 2,
    content: "jello bean",
  },
  {
    id: 3,
    content: "jello bean",
  },
  {
    id: 4,
    content: "jello bean",
  },
];

const TodoList = () => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} />
      ))}
    </ul>
  );
};

export default TodoList;
