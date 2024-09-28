"use client";

import { Position } from "@/types/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import KanbanTask from "./KanbanTask";
import { SortableContext } from "@dnd-kit/sortable";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/rootReducer";
import {
  fetchTasks,
  moveTaskBetweenColumns,
  reorderTaskInColumn,
} from "@/store/slices/kanbanSlice";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/store/store";
import { completeTodo } from "@/store/slices/todoSlice";

type Props = {
  openKanbanWidget: boolean;
  id: string;
  position: Position;
};

const Kanban = ({ openKanbanWidget, id, position }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const columns = useSelector((state: RootState) => state.kanban.columns);
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, todos]);

  const [activeTask, setActiveTask] = useState<{
    taskId: UniqueIdentifier;
    fromColumnId: UniqueIdentifier;
  } | null>(null);

  const [draggedTask, setDraggedTask] = useState<{
    id: string;
    content: string;
    color: string;
  } | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeTaskId = active.id;
    const fromColumn = columns.find((column) =>
      column.tasks.some((task) => task.id === activeTaskId),
    );

    if (fromColumn) {
      const task = fromColumn.tasks.find((task) => task.id === activeTaskId);
      setActiveTask({ taskId: activeTaskId, fromColumnId: fromColumn.id });
      setDraggedTask({
        id: task!.id,
        content: task!.content,
        color: fromColumn.color,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !activeTask) return;

    const fromColumnId = activeTask.fromColumnId;
    const toColumnId =
      columns.find((column) => column.tasks.some((task) => task.id === over.id))
        ?.id || over.id;

    if (fromColumnId === toColumnId) {
      const fromColumn = columns.find((col) => col.id === fromColumnId);
      if (fromColumn) {
        const oldIndex = fromColumn.tasks.findIndex(
          (task) => task.id === active.id,
        );
        const newIndex = fromColumn.tasks.findIndex(
          (task) => task.id === over.id,
        );
        if (oldIndex !== newIndex) {
          dispatch(
            reorderTaskInColumn({
              columnId: fromColumnId.toString(),
              oldIndex,
              newIndex,
            }),
          );
        }
      }
    } else {
      dispatch(
        moveTaskBetweenColumns({
          fromColumnId,
          toColumnId,
          taskId: active.id,
        }),
      );
    }

    setActiveTask(null);
    setDraggedTask(null);
  };

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${
        openKanbanWidget ? "" : "hidden"
      } absolute z-20 h-[19.5rem] w-[33.5rem] rounded-xl ${isGlassMode ? "bg-opacity-30 dark:bg-opacity-80" : "dark:border-neutral-800"} bg-neutral-100 p-1 pb-2 shadow-2xl dark:border dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-1 w-full">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-600 dark:bg-neutral-400" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>
      <div className="mt-1 flex h-full gap-2 p-2">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-1/3 rounded-lg border border-neutral-300/80 bg-neutral-200/30 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/15"
            >
              <div className="mb-2 flex items-center">
                <span
                  className={cn(
                    `ml-1 mr-2 size-1 rounded-full`,
                    `bg-${column.color}-500`,
                  )}
                ></span>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  {column.column_name}
                </h2>
              </div>
              <div className="max-h-[236px] space-y-2 overflow-scroll rounded-lg border-gray-300 dark:border-gray-700">
                <SortableContext items={column.tasks.map((task) => task.id)}>
                  {column.tasks.map((task) => (
                    <KanbanTask
                      key={task.id}
                      id={task.id}
                      color={column.color}
                      content={task.content}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          ))}
          <DragOverlay>
            {draggedTask ? (
              <KanbanTask
                id={draggedTask.id}
                color={draggedTask.color}
                content={draggedTask.content}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <div className={`absolute right-1 top-0`}>
        <MinimizeWidget widgetId="Kanban" />
      </div>
    </div>
  );
};

export default Kanban;
