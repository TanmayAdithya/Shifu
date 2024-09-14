import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { FiPlus as AddTodo } from "react-icons/fi";
import { addTodo } from "@/store/slices/todoSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <div className="flex w-full items-center rounded-md border border-neutral-400/60 bg-white dark:border dark:bg-neutral-900">
          <Input
            type="text"
            placeholder="Add a new todo"
            className="dark: w-full rounded-md p-2 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button
          className="cursor-pointer rounded-md bg-neutral-500 p-2 transition-colors duration-150 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-300"
          type="submit"
        >
          <AddTodo size={"18px"} />
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
