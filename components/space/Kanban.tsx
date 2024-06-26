import React from "react";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  return (
    <div
      className={`${openKanbanWidget ? "" : "hidden"} absolute left-96 top-56 aspect-video w-[45rem] rounded-xl bg-white`}
    >
      Kanban
    </div>
  );
};

export default Kanban;
