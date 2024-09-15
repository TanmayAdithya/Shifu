"use client";

import React from "react";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  return (
    <div
      className={`${
        openKanbanWidget ? "" : "hidden"
      } absolute bottom-56 left-56 z-10 h-[18.75rem] w-[33rem] rounded-xl bg-neutral-100 shadow-2xl dark:bg-neutral-900`}
    >
      <div className="flex gap-2 p-2">
        {/* To Do Column */}
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/40">
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
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/40">
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
        <div className="w-1/3 rounded-lg border border-neutral-300/60 p-2 dark:border-neutral-700/30 dark:bg-neutral-800/40">
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
    </div>
  );
};

export default Kanban;
