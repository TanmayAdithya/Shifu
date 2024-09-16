"use client";

import React from "react";
import MinimizeWidget from "./MinimizeWidget";
import { Position } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  openMatrixWidget: boolean;
  id: string;
  position: Position;
};

const Matrix = ({ openMatrixWidget, id, position }: Props) => {
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
        openMatrixWidget ? "" : "hidden"
      } absolute z-10 h-[25rem] w-[28rem] rounded-3xl bg-white p-4 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-[4px] w-full">
        <div
          {...listeners}
          {...attributes}
          className="mx-auto h-1 w-16 rounded-full bg-neutral-700"
        ></div>
      </div>
      <div className="relative grid h-full grid-cols-2 grid-rows-2 rounded-xl">
        {/* Quadrant 1: Do First */}
        <div className="flex justify-start rounded-tl-xl border-[2px] border-r-0 border-neutral-800">
          <div className="h-fit w-fit rounded-br-[10px] rounded-tl-[10px] border-[2px] border-l-0 border-t-0 border-neutral-800 px-2 py-1 text-center">
            <p className="pointer-events-none text-xs text-neutral-100">
              Do First
            </p>
          </div>
        </div>

        {/* Quadrant 2: Schedule */}
        <div className="flex justify-end rounded-tr-xl border-[2px] border-neutral-800">
          <div className="h-fit w-fit rounded-bl-[10px] rounded-tr-[10px] border-[2px] border-r-0 border-t-0 border-neutral-800 px-2 py-1 text-center">
            <p className="pointer-events-none text-xs text-neutral-100">
              Schedule
            </p>
          </div>
        </div>

        {/* Quadrant 3: Delegate */}
        <div className="flex flex-col justify-end rounded-bl-xl border-[2px] border-r-0 border-t-0 border-neutral-800">
          <div className="h-fit w-fit rounded-tr-[10px] border-[2px] border-b-0 border-l-0 border-neutral-800 px-2 py-1 text-center">
            <p className="pointer-events-none text-xs text-neutral-100">
              Delegate
            </p>
          </div>
        </div>

        {/* Quadrant 4: Eliminate */}
        <div className="flex flex-col items-end justify-end rounded-br-xl border-[2px] border-t-0 border-neutral-800">
          <div className="h-fit w-fit rounded-tl-[10px] border-[2px] border-b-0 border-r-0 border-neutral-800 px-2 py-1 text-center">
            <p className="pointer-events-none text-xs text-neutral-100">
              Eliminate
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-[2px]">
        <MinimizeWidget widgetId="Matrix" />
      </div>
    </div>
  );
};

export default Matrix;
