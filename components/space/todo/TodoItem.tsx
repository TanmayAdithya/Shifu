import React, { useEffect, useRef, useState } from "react";
import { PiTrashSimpleBold as Delete } from "react-icons/pi";
import { RiEditFill as Edit } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { completeTodo, removeTodo, updateTodo } from "@/store/slices/todoSlice";
import { IoClose as ExitEditMode } from "react-icons/io5";
import { FaTag as Label } from "react-icons/fa";

type Props = {
  content: string;
  id: string;
  completed: boolean;
};

const TodoItem = ({ content, id, completed }: Props) => {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const [newTodoContent, setNewTodoContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>(content);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(completeTodo(id));
  };

  function handleEditTodo(newContent: string) {
    setNewTodoContent(newContent);
    dispatch(updateTodo({ id: id, content: newContent }));
    setOriginalContent(newContent);
  }

  function handleExitEditMode() {
    setNewTodoContent(originalContent);
    setEditTodo(false);
  }

  useEffect(() => {
    if (editTodo && inputRef.current) {
      inputRef.current.select();
    }
  }, [editTodo]);

  return (
    <li
      className={`flex flex-col justify-between gap-2 rounded-md border border-neutral-400/60 p-2 ${completed ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between">
        <input
          type="checkbox"
          className="mr-2 mt-1"
          onChange={() => handleCompleteTodo(id)}
        />
        <p
          className={`mr-2 w-52 flex-1 text-balance break-words leading-tight text-neutral-700 ${completed ? "line-through" : ""}`}
        >
          {editTodo ? (
            <div className="flex items-center">
              <input
                value={newTodoContent}
                ref={inputRef}
                className="w-[13.5rem] break-words rounded focus:outline-none"
                onChange={(e) => {
                  setNewTodoContent(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setNewTodoContent(originalContent);
                    handleExitEditMode();
                  } else if (e.key === "Enter") {
                    handleEditTodo(newTodoContent);
                    setEditTodo(false);
                  }
                }}
              />
              <ExitEditMode
                className="cursor-pointer text-neutral-600 hover:text-neutral-800"
                onClick={handleExitEditMode}
              />
            </div>
          ) : (
            content
          )}
        </p>
      </div>
      <div className="flex items-center space-x-2 self-end">
        {editTodo ? (
          ""
        ) : (
          <Edit
            className="cursor-pointer text-neutral-500 transition-colors duration-150 hover:text-neutral-800"
            onClick={() => setEditTodo((prev) => !prev)}
          />
        )}
        <Label
          size={"13px"}
          className="cursor-pointer text-neutral-500 transition-colors duration-150 hover:text-neutral-800"
        />
        <Delete
          className="cursor-pointer text-neutral-500 transition-colors duration-150 hover:text-neutral-800"
          onClick={() => handleDeleteTodo(id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
