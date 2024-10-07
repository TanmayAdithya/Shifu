import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPlus as AddTodo } from "react-icons/lu";

import { addTask, addTodo } from "@/store/slices/todoSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store/store";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== "") {
      dispatch(
        addTask({ content, urgent: false, important: false, status: "todo" }),
      );
      setContent("");
    }
  };

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <form onSubmit={handleAddTodo} className="mb-4">
      <div className="mb-2 flex w-full items-center gap-2">
        <div
          className={`${isGlassMode ? "dark:bg-transparent" : ""} flex w-full items-center rounded-md dark:border dark:bg-neutral-900`}
        >
          <Input
            type="text"
            placeholder="Add a new todo"
            className={`${isGlassMode ? "border-neutral-100 border-neutral-50/45 text-neutral-50 placeholder:text-neutral-100 focus-visible:ring-transparent dark:focus-visible:ring-neutral-300" : "border-neutral-400/60"} w-full rounded-md p-2 outline-none`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button
          className={`cursor-pointer rounded-md p-2 transition-colors duration-150 ${isGlassMode ? "bg-neutral-100/60 text-neutral-700 hover:bg-neutral-200" : "bg-neutral-500 hover:bg-neutral-700"} dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-300`}
          type="submit"
        >
          <AddTodo size={"18px"} onClick={handleAddTodo} />
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
