"use client";

import React from "react";
import MinimizeWidget from "./MinimizeWidget";

type Props = {
  openMatrixWidget: boolean;
};

const Matrix = ({ openMatrixWidget }: Props) => {
  return (
    <div
      className={`${
        openMatrixWidget ? "" : "hidden"
      } absolute left-72 top-20 z-10 aspect-square w-[30rem] rounded-3xl bg-white p-6 pt-8 shadow-md dark:bg-neutral-900`}
    >
      <div className="relative grid h-full grid-cols-2 grid-rows-2 rounded-xl">
        {/* Quadrant 1: Do First */}
        <div className="rounded-tl-xl border-[2px] border-r-0 border-neutral-800 p-3">
          <div className="-translate-y-7 rounded-full bg-neutral-800 p-6 py-1 text-center">
            <p className="pointer-events-none text-sm text-neutral-50">
              Do First
            </p>
          </div>
        </div>

        {/* Quadrant 2: Schedule */}
        <div className="rounded-tr-xl border-[2px] border-neutral-800 p-3">
          <div className="-translate-y-7 rounded-full bg-neutral-800 p-6 py-1 text-center">
            <p className="pointer-events-none text-sm text-neutral-50">
              Schedule
            </p>
          </div>
        </div>

        {/* Quadrant 3: Delegate */}
        <div className="rounded-bl-xl border-[2px] border-r-0 border-t-0 border-neutral-800 p-3">
          <div className="-translate-y-7 rounded-full bg-neutral-800 p-6 py-1 text-center">
            <p className="pointer-events-none text-sm text-neutral-50">
              Delegate
            </p>
          </div>
        </div>

        {/* Quadrant 4: Eliminate */}
        <div className="rounded-br-xl border-[2px] border-t-0 border-neutral-800 p-3">
          <div className="-translate-y-7 rounded-full bg-neutral-800 p-6 py-1 text-center">
            <p className="pointer-events-none text-sm text-neutral-50">
              Eliminate
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-[6px]">
        <MinimizeWidget widgetId="Matrix" />
      </div>
    </div>
  );
};

export default Matrix;
