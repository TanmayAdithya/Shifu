import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, updateTodoFields } from "@/store/slices/todoSlice";
import { IoClose as ExitEditMode } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/store/rootReducer";
import { AppDispatch } from "@/store/store";
import {
  LuPenSquare as Edit,
  LuTrash2 as Delete,
  LuTag as Label,
} from "react-icons/lu";

const TodoItem = ({ content, _id, status, important, urgent }: Todo) => {
  const dispatch: AppDispatch = useDispatch();
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const [newTodoContent, setNewTodoContent] = useState<string>(content);
  const [originalContent, setOriginalContent] = useState<string>(content);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = async (_id: string) => {
    try {
      await dispatch(removeTask(_id)).unwrap();
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  const handleCompleteTodo = (_id: string, currentStatus: string) => {
    const newStatus = currentStatus === "complete" ? "todo" : "complete";
    dispatch(updateTodoFields({ _id, updates: { status: newStatus } }));
  };

  function handleEditTodo(newContent: string) {
    setNewTodoContent(newContent);
    dispatch(updateTodoFields({ _id, updates: { content: newContent } }));
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

  const handleStatusChange = (_id: string, label: string) => {
    let updates = {};
    switch (label) {
      case "Important":
        updates = { important: !important };
        break;
      case "Urgent":
        updates = { urgent: !urgent };
        break;
      case "In Progress":
        updates = { status: status === "in-progress" ? "todo" : "in-progress" };
        break;
      case "Completed":
        updates = { status: "complete" };
        break;
      default:
        break;
    }
    dispatch(updateTodoFields({ _id, updates }));
  };

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <li
      className={`flex flex-col justify-between gap-2 rounded-md ${isGlassMode ? "border-neutral-200" : "border-neutral-400/60"} border p-2 transition-colors duration-200 ${
        status === "complete"
          ? "0 opacity-70"
          : ` ${isGlassMode ? "hover:border-neutral-50 dark:hover:border-neutral-300" : "hover:border-neutral-500 dark:hover:border-neutral-100"}`
      }`}
    >
      <div className="flex items-start justify-between">
        <Checkbox
          checked={status === "complete"}
          onCheckedChange={() => handleCompleteTodo(_id, status as string)}
          className={` ${isGlassMode ? "border-neutral-100" : "border-neutral-500"} mr-2 mt-[2px]`}
        />
        <p
          className={`mr-2 w-52 flex-1 text-balance break-words leading-tight ${isGlassMode ? "text-neutral-50" : "text-neutral-700 dark:text-neutral-100"} ${
            status === "complete" ? "line-through" : ""
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
          {!(status === "complete") && (
            <>
              {status === "in-progress" && (
                <Badge
                  variant="outline"
                  className="border-yellow-500/30 bg-yellow-500/10 font-light text-yellow-500"
                >
                  <span
                    className={`mr-1 size-1 rounded-full bg-yellow-500 text-xs`}
                  ></span>
                  In Progress
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!editTodo && !(status === "complete") && (
            <Edit
              className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
              onClick={() => setEditTodo(true)}
            />
          )}
          {/* Dropdown for labels */}
          {!(status === "complete") && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Label
                  className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-[60] p-2">
                {["Important", "Urgent", "In Progress"].map((label) => {
                  const isChecked = () => {
                    switch (label) {
                      case "Important":
                        return important;
                      case "Urgent":
                        return urgent;
                      case "In Progress":
                        return status === "in-progress";
                      default:
                        return false;
                    }
                  };

                  return (
                    <div key={label} className="flex items-center gap-1">
                      <Checkbox
                        checked={isChecked()}
                        onCheckedChange={() => handleStatusChange(_id, label)}
                        className="mt-[2px] border-neutral-500"
                      />
                      <p className="text-sm text-neutral-800 dark:text-neutral-200">
                        {label}
                      </p>
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Delete
            className={` ${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
            onClick={() => handleDeleteTodo(_id)}
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
