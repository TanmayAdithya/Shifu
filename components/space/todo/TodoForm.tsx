import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus as AddTodo } from "react-icons/fa";
import { addTodo } from "@/store/slices/todoSlice";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: InputEvent) => {
    e.preventDefault();
    dispatch(addTodo(content));
    setContent("");
  };

  return (
    <form onSubmit={(e) => handleSubmit} className="mb-4">
      <div className="mb-2 flex w-full items-center gap-2">
        <div className="flex w-full items-center rounded-md border border-[#E8E8E8] bg-white pl-1">
          <input
            type="text"
            placeholder="Add a new todo"
            className="w-full rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="cursor-pointer rounded-md bg-[#8F8F8F] p-2 transition-colors duration-100 hover:bg-neutral-700">
          <AddTodo size={"17px"} color="#fff" />
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
