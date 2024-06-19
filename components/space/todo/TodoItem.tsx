import React, { useState } from "react";
import { PiTrashSimpleBold as Delete } from "react-icons/pi";
import { RiEditFill as Edit } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { completeTodo, removeTodo } from "@/store/slices/todoSlice";

type Props = {
  content: string;
  id: string;
  completed: boolean;
};

const TodoItem = ({ content, id, completed }: Props) => {
  const dispatch = useDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(completeTodo(id));
  };

  return (
    <li
      className={`flex items-start justify-between rounded-md border p-2 ${completed ? "opacity-70" : ""}`}
    >
      <input
        type="checkbox"
        className="mr-2 mt-1"
        onChange={() => handleCompleteTodo(id)}
      />
      <p
        className={`mr-2 w-56 flex-1 text-balance break-words leading-tight text-neutral-700 ${completed ? "line-through" : ""}`}
      >
        {content}
      </p>
      <div className="flex space-x-2">
        <Edit className="mt-1 cursor-pointer text-neutral-400 transition-colors duration-150 hover:text-neutral-800" />
        <Delete
          className="mt-1 cursor-pointer text-neutral-400 transition-colors duration-150 hover:text-neutral-800"
          onClick={() => handleDeleteTodo(id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
