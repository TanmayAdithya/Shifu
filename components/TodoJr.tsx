import React, { useState } from "react";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  updateTodoLabel,
} from "@/store/slices/previewSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuPenSquare, LuTrash2, LuPlus, LuTag } from "react-icons/lu";
import { Position } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { useDraggable } from "@dnd-kit/core";
import { AppDispatch } from "@/store/store";

type Props = {
  id: string;
  position: Position;
  zIndex: number;
  bringToTop: () => void;
};

const TodoWidget = ({ id, zIndex, bringToTop, position }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );
  const todos = useSelector((state: RootState) => state.preview.todos);
  const [newTodoContent, setNewTodoContent] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoContent.trim()) {
      dispatch(addTodo({ content: newTodoContent }));
      setNewTodoContent("");
    }
  };

  const handleUpdateTodo = (_id: string, content: string) => {
    dispatch(updateTodo({ _id, updates: { content } }));
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (_id: string) => {
    dispatch(deleteTodo(_id));
  };

  const handleToggleTodoStatus = (_id: string) => {
    dispatch(toggleTodoStatus(_id));
  };

  const handleLabelChange = (_id: string, label: string) => {
    const todo = todos.find((todo) => todo._id === _id);
    let updates = {};
    switch (label) {
      case "Important":
        updates = { important: !todo?.important };
        break;
      case "Urgent":
        updates = { urgent: !todo?.urgent };
        break;
      case "In Progress":
        updates = {
          status: todo?.status === "in-progress" ? "todo" : "in-progress",
        };
        break;
    }
    dispatch(updateTodoLabel({ _id, updates }));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className={`${isGlassMode ? "bg-opacity-30 backdrop-blur-xl dark:bg-opacity-80" : ""} absolute mx-auto w-[20rem] max-w-xs rounded-xl border border-neutral-100 bg-white p-4 shadow-xl dark:border dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-500 dark:bg-neutral-300" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>
      <h1
        className={`mb-4 text-xl font-medium ${isGlassMode ? "text-neutral-100" : ""}`}
      >
        Todo
      </h1>
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="mb-2 flex w-full items-center gap-2">
          <div
            className={`${isGlassMode ? "dark:bg-transparent" : ""} flex w-full items-center rounded-md dark:border dark:bg-neutral-900`}
          >
            <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodoContent}
              onChange={(e) => setNewTodoContent(e.target.value)}
              className={`${isGlassMode ? "border-neutral-100 border-neutral-50/45 text-neutral-50 placeholder:text-neutral-100 focus-visible:ring-transparent dark:focus-visible:ring-neutral-300" : "border-neutral-400/60"} w-full rounded-md p-2 outline-none`}
            />
          </div>
          <Button
            className={`cursor-pointer rounded-md p-2 transition-colors duration-150 ${isGlassMode ? "bg-neutral-100/60 text-neutral-700 hover:bg-neutral-200" : "bg-neutral-500 hover:bg-neutral-700"} dark:bg-neutral-50 dark:text-neutral-800 dark:hover:bg-neutral-300`}
            type="submit"
          >
            <LuPlus size={18} />
          </Button>
        </div>
      </form>
      <ul className="relative h-[134px] space-y-2 overflow-y-scroll">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`flex flex-col justify-between gap-2 rounded-md ${isGlassMode ? "border-neutral-200" : "border-neutral-400/60"} border p-2 transition-colors duration-200 ${
              todo.status === "complete"
                ? "opacity-70"
                : `${isGlassMode ? "hover:border-neutral-50 dark:hover:border-neutral-300" : "hover:border-neutral-500 dark:hover:border-neutral-100"}`
            }`}
          >
            <div className="flex items-start justify-between">
              <Checkbox
                checked={todo.status === "complete"}
                onCheckedChange={() => handleToggleTodoStatus(todo._id)}
                className={`${isGlassMode ? "border-neutral-100" : "border-neutral-500"} mr-2 mt-[2px]`}
              />
              {editingTodoId === todo._id ? (
                <Input
                  value={todo.content}
                  onChange={(e) => handleUpdateTodo(todo._id, e.target.value)}
                  onBlur={() => setEditingTodoId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateTodo(
                        todo._id,
                        (e.target as HTMLInputElement).value,
                      );
                    }
                    if (e.key === "Enter") {
                      handleUpdateTodo(
                        todo._id,
                        (e.target as HTMLInputElement).value,
                      );
                    }
                  }}
                  className={`mr-2 w-52 flex-1`}
                  autoFocus
                />
              ) : (
                <p
                  className={`mr-2 w-52 flex-1 text-balance break-words leading-tight ${isGlassMode ? "text-neutral-50" : "text-neutral-700 dark:text-neutral-100"} ${
                    todo.status === "complete" ? "line-through" : ""
                  }`}
                >
                  {todo.content}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 self-start">
                {todo.status === "in-progress" && (
                  <Badge
                    variant="outline"
                    className="border-yellow-500/30 bg-yellow-500/10 font-light text-yellow-500"
                  >
                    <span className="mr-1 size-1 rounded-full bg-yellow-500 text-xs"></span>
                    In Progress
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {todo.status !== "complete" && (
                    <>
                      <LuPenSquare
                        size={13}
                        onClick={() => setEditingTodoId(todo._id)}
                        className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                      />
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                          <LuTag
                            size={13}
                            className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-[60] p-2">
                          {["Important", "Urgent", "In Progress"].map(
                            (label) => {
                              const isChecked = () => {
                                switch (label) {
                                  case "Important":
                                    return todo.important;
                                  case "Urgent":
                                    return todo.urgent;
                                  case "In Progress":
                                    return todo.status === "in-progress";
                                  default:
                                    return false;
                                }
                              };
                              return (
                                <div
                                  key={label}
                                  className="flex items-center gap-1"
                                >
                                  <Checkbox
                                    checked={isChecked()}
                                    onCheckedChange={() =>
                                      handleLabelChange(todo._id, label)
                                    }
                                    className="mt-[2px] border-neutral-500"
                                  />
                                  <p className="text-sm text-neutral-800 dark:text-neutral-200">
                                    {label}
                                  </p>
                                </div>
                              );
                            },
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  <LuTrash2
                    size={13}
                    onClick={() => handleDeleteTodo(todo._id)}
                    className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWidget;
