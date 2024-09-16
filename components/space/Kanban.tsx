"use client";

import { Position } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";
import React from "react";
import MinimizeWidget from "./MinimizeWidget";

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
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${
        openKanbanWidget ? "" : "hidden"
      } absolute bottom-56 left-56 z-10 h-[19.5rem] w-[33.5rem] rounded-xl bg-neutral-100 p-1 shadow-2xl dark:border dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-1 w-full">
        <div
          {...listeners}
          {...attributes}
          className="mx-auto h-1 w-16 rounded-full bg-neutral-700"
        ></div>
      </div>
      <div className="mt-1 flex gap-2 p-2">
        {/* To Do Column */}
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/15">
          <div className="mb-2 flex items-center">
            <span className="ml-1 mr-2 size-1 rounded-full bg-blue-300"></span>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              To Do
            </h2>
          </div>
          <div className="h- max-h-[236px] space-y-2 overflow-scroll rounded-lg border-gray-300 dark:border-gray-700">
            <div className="rounded-lg bg-blue-500 p-2 text-sm text-neutral-100 dark:bg-blue-800">
              Buy groceries
            </div>
            <div className="rounded-lg bg-blue-500 p-2 text-sm text-neutral-100 dark:bg-blue-800">
              Call the plumber
            </div>
            <div className="rounded-lg bg-blue-500 p-2 text-sm text-neutral-100 dark:bg-blue-800">
              Read a book
            </div>
            <div className="rounded-lg bg-blue-500 p-2 text-sm text-neutral-100 dark:bg-blue-800">
              Prepare presentation slides
            </div>
            <div className="rounded-lg bg-blue-500 p-2 text-sm text-neutral-100 dark:bg-blue-800">
              Plan weekend trip
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/15">
          <div className="mb-2 flex items-center">
            <span className="ml-1 mr-2 size-1 rounded-full bg-yellow-500"></span>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              On Going
            </h2>
          </div>
          <div className="h-full max-h-[240px] space-y-2 overflow-scroll rounded-lg border-gray-300 dark:border-gray-700">
            <div className="rounded-lg bg-yellow-500 p-2 text-sm text-neutral-100 dark:bg-yellow-800">
              Finish project report
            </div>
            <div className="rounded-lg bg-yellow-500 p-2 text-sm text-neutral-100 dark:bg-yellow-800">
              Design new logo
            </div>
          </div>
        </div>

        {/* Complete Column */}
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/15">
          <div className="mb-2 flex items-center">
            <span className="ml-1 mr-2 size-1 rounded-full bg-green-500"></span>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Complete
            </h2>
          </div>
          <div className="h-full max-h-[240px] space-y-2 overflow-scroll rounded-lg border-gray-300 dark:border-gray-700">
            <div className="rounded-lg bg-green-500 p-2 text-sm text-neutral-100 dark:bg-green-800">
              Pay utility bills
            </div>
            <div className="rounded-lg bg-green-500 p-2 text-sm text-neutral-100 dark:bg-green-800">
              Organize files
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute right-1 top-0`}>
        <MinimizeWidget widgetId="Kanban" />
      </div>
    </div>
  );
};

export default Kanban;
