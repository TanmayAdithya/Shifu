"use client";

import { Position } from "@/types/types";
import MinimizeWidget from "../MinimizeWidget";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useDraggable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

type Props = {
  openTodoWidget: boolean;
  id: string;
  position: Position;
  zIndex: number;
  bringToTop: () => void;
};

const Todo = ({ openTodoWidget, zIndex, bringToTop, id, position }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className={`${openTodoWidget ? "" : "hidden"} ${isGlassMode ? "bg-opacity-30 backdrop-blur-xl dark:bg-opacity-80" : ""} absolute mx-auto w-[20rem] max-w-xs rounded-xl bg-white p-4 dark:border dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto cursor-grab ${isGlassMode ? "bg-neutral-600 dark:bg-neutral-400" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>
      <h1
        className={`mb-4 text-xl font-medium ${isGlassMode ? "text-neutral-100" : ""}`}
      >
        Todo
      </h1>
      <div className="absolute right-4 top-4">
        <MinimizeWidget widgetId="Todo" />
      </div>
      <div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
