"use client";

import React from "react";
import { Todo } from "@/types/types";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

const TaskDot = ({ task, x, y }: { task: Todo; x: number; y: number }) => {
  const xPos = `${x}%`;
  const yPos = `${y}%`;

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <TooltipProvider key={task._id} delayDuration={75} skipDelayDuration={75}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={{
              position: "absolute",
              left: xPos,
              top: yPos,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
          >
            <div
              className={` ${isGlassMode ? "bg-neutral-200 dark:bg-neutral-300" : "bg-neutral-800 dark:bg-neutral-200"} h-3 w-3 rounded-full`}
            ></div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{task.content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TaskDot;
