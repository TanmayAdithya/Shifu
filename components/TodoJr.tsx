import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuPenSquare, LuTrash2, LuPlus, LuTag } from "react-icons/lu";
import { Position } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  position: Position;
  zIndex: number;
  bringToTop: () => void;
};

const TodoJr = ({ id, zIndex, bringToTop, position }: Props) => {
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );
  const dummyTodos = [
    {
      id: 1,
      content: "Complete project proposal",
      status: "todo",
      important: true,
      urgent: false,
    },
    {
      id: 2,
      content: "Buy groceries",
      status: "complete",
      important: false,
      urgent: false,
    },
    {
      id: 3,
      content: "Call mom",
      status: "in-progress",
      important: false,
      urgent: true,
    },
  ];

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className={`${isGlassMode ? "bg-opacity-30 backdrop-blur-xl dark:bg-opacity-80" : ""} absolute mx-auto w-[20rem] max-w-xs rounded-xl bg-white p-4 dark:border dark:border-neutral-800 dark:bg-neutral-900`}
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
      <form className="mb-4">
        <div className="mb-2 flex w-full items-center gap-2">
          <div
            className={`${isGlassMode ? "dark:bg-transparent" : ""} flex w-full items-center rounded-md dark:border dark:bg-neutral-900`}
          >
            <Input
              type="text"
              placeholder="Add a new todo"
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
      <ul className="relative h-[128px] space-y-2 overflow-y-scroll">
        {dummyTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex flex-col justify-between gap-2 rounded-md ${isGlassMode ? "border-neutral-200" : "border-neutral-400/60"} border p-2 transition-colors duration-200 ${
              todo.status === "complete"
                ? "opacity-70"
                : `${isGlassMode ? "hover:border-neutral-50 dark:hover:border-neutral-300" : "hover:border-neutral-500 dark:hover:border-neutral-100"}`
            }`}
          >
            <div className="flex items-start justify-between">
              <Checkbox
                checked={todo.status === "complete"}
                className={`${isGlassMode ? "border-neutral-100" : "border-neutral-500"} mr-2 mt-[2px]`}
              />
              <p
                className={`mr-2 w-52 flex-1 text-balance break-words leading-tight ${isGlassMode ? "text-neutral-50" : "text-neutral-700 dark:text-neutral-100"} ${
                  todo.status === "complete" ? "line-through" : ""
                }`}
              >
                {todo.content}
              </p>
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
              <div className="flex items-center space-x-2">
                <LuPenSquare
                  size={13}
                  className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                />
                <LuTag
                  size={13}
                  className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                />
                <LuTrash2
                  size={13}
                  className={`${isGlassMode ? "text-neutral-100 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"} cursor-pointer transition-colors duration-150 dark:text-neutral-50 dark:hover:text-neutral-300`}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoJr;
