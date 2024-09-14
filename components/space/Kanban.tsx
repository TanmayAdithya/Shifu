"use client";

import React from "react";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  return (
    <div
      className={`${openKanbanWidget ? "" : "hidden"} absolute left-96 top-56 z-10 h-[24.75rem] w-[44.5rem] overflow-scroll rounded-xl bg-white shadow-2xl dark:bg-neutral-900`}
    ></div>
  );
};

export default Kanban;
