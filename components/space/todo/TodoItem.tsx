import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const TodoItem = () => {
  return (
    <li className={`flex items-center justify-between rounded border p-2`}>
      <span className={`flex-1`}>hello</span>
      <div className="flex space-x-2">
        <FaCheck className="cursor-pointer text-green-600" />
        <FaTrash className="cursor-pointer text-red-600" />
      </div>
    </li>
  );
};

export default TodoItem;
