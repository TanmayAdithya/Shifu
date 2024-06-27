import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus as AddTodo } from "react-icons/fa";
import { addTodo } from "@/store/slices/todoSlice";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== "") {
      dispatch(addTodo(content));
      setContent("");
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="mb-4">
      <div className="mb-2 flex w-full items-center gap-2">
        <div className="flex w-full items-center rounded-md border border-neutral-400/60 bg-white pl-1">
          <input
            type="text"
            placeholder="Add a new todo"
            className="w-full rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          className="cursor-pointer rounded-md bg-neutral-500 p-2 transition-colors duration-150 hover:bg-neutral-700"
          type="submit"
        >
          <AddTodo size={"17px"} color="#fff" />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
