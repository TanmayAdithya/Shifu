"use client";

import { Position } from "@/types/types";
import MinimizeWidget from "../MinimizeWidget";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useDraggable } from "@dnd-kit/core";

type Props = { openTodoWidget: boolean; id: string; position: Position };

const Todo = ({ openTodoWidget, id, position }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${openTodoWidget ? "" : "hidden"} absolute z-10 mx-auto w-[20rem] max-w-xs rounded-xl bg-white p-4 dark:border dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className="mx-auto h-1 w-16 rounded-full bg-neutral-700"
        ></div>
      </div>
      <h1 className="mb-4 text-xl font-medium">Todo</h1>
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
