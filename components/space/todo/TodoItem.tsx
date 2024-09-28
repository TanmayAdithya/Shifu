import React, { useEffect, useRef, useState } from "react";
import { LuTimerReset as UrgentIcon } from "react-icons/lu";
import { BsFillExclamationOctagonFill as ImportantIcon } from "react-icons/bs";
import { PiTrashSimpleBold as Delete } from "react-icons/pi";
import { RiEditFill as Edit } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  removeTodo,
  setInProgress,
  toggleImportance,
  toggleUrgency,
  updateTodo,
} from "@/store/slices/todoSlice";
import { IoClose as ExitEditMode } from "react-icons/io5";
import { FaTag as Label } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/store/rootReducer";

const TodoItem = ({ content, id, status, important, urgent }: Todo) => {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(status === "complete");
  const [newTodoContent, setNewTodoContent] = useState<string>(content);
  const [originalContent, setOriginalContent] = useState<string>(content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCompleted(status === "complete");
  }, [status]);

  const handleDeleteTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    setCompleted(!completed);
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

  const handleStatusChange = (id: string, newStatus: string) => {
    switch (newStatus) {
      case "Important":
        dispatch(toggleImportance({ id, important: !important }));
        break;
      case "Urgent":
        dispatch(toggleUrgency({ id, urgent: !urgent }));
        break;
      case "In Progress":
        dispatch(setInProgress(id));
        break;
      case "Completed":
        dispatch(completeTodo(id));
        break;
      default:
        break;
    }
  };

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <li
      className={`flex flex-col justify-between gap-2 rounded-md ${isGlassMode ? "border-neutral-200" : "border-neutral-400/60"} border p-2 transition-colors duration-200 ${
        completed
          ? "0 opacity-70"
          : ` ${isGlassMode ? "hover:border-neutral-50 dark:hover:border-neutral-300" : "hover:border-neutral-500 dark:hover:border-neutral-100"}`
      }`}
    >
      <div className="flex items-start justify-between">
        <Checkbox
          checked={completed}
          onCheckedChange={() => handleCompleteTodo(id)}
          className={` ${isGlassMode ? "border-neutral-100" : "border-neutral-500"} mr-2 mt-[2px]`}
        />
        <p
          className={`mr-2 w-52 flex-1 text-balance break-words leading-tight ${isGlassMode ? "text-neutral-50" : "text-neutral-700 dark:text-neutral-100"} ${
            completed ? "line-through" : ""
          }`}
        >
          {editTodo ? (
            <div className="flex items-center">
              <input
                value={newTodoContent}
                ref={inputRef}
                className={` ${isGlassMode ? "bg-neutral-100 bg-opacity-10" : ""} w-[13.5rem] break-words rounded focus:outline-none`}
                onChange={(e) => setNewTodoContent(e.target.value)}
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
      {/* Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 self-start">
          {!completed && (
            <>
              {status === "in-progress" && (
                <Badge
                  variant="outline"
                  className="border-green-500/30 bg-green-500/10 font-light text-green-500"
                >
                  <span
                    className={`mr-1 size-1 rounded-full bg-green-500 text-xs`}
                  ></span>
                  In Progress
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!editTodo && !completed && (
            <Edit
              className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
              onClick={() => setEditTodo(true)}
            />
          )}
          {/* Dropdown for labels */}
          {!completed && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Label
                  size={"13px"}
                  className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50 p-2">
                {["Important", "Urgent", "In Progress"].map((label) => (
                  <div key={label} className="flex items-center gap-1">
                    <Checkbox
                      checked={
                        label === "Important"
                          ? important
                          : label === "Urgent"
                            ? urgent
                            : label === "In Progress"
                              ? status === "in-progress"
                              : completed
                      }
                      key={label}
                      onCheckedChange={() => handleStatusChange(id, label)}
                      className="mt-[2px] border-neutral-500"
                    ></Checkbox>
                    <p
                      key={label}
                      className="text-sm text-neutral-800 dark:text-neutral-200"
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Delete
            className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
            onClick={() => handleDeleteTodo(id)}
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
