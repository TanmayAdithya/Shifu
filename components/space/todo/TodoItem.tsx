import React from "react";
import { PiTrashSimpleBold as Delete } from "react-icons/pi";
import { RiEditFill as Edit } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "@/store/slices/todoSlice";
import { TodosState } from "@/types/types";

type Props = {
  content: string;
  id: string;
};

const TodoItem = ({ content, id }: Props) => {
  const dispatch = useDispatch();

  const deleteTodo = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(removeTodo(id));
  };
  return (
    <li className={`flex items-start justify-between rounded-md border p-2`}>
      <input type="checkbox" className="mr-2 mt-1" />
      <p className="mr-2 w-56 flex-1 text-balance break-words leading-tight text-neutral-700">
        {content}
      </p>
      <div className="flex space-x-2">
        <Edit className="mt-1 cursor-pointer text-neutral-400 hover:text-neutral-800" />
        <Delete
          className="mt-1 cursor-pointer text-neutral-400 hover:text-neutral-800"
          onClick={() => deleteTodo}
        />
      </div>
    </li>
  );
};

export default TodoItem;
