import React from "react";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  return <div className={`${openKanbanWidget ? "" : "hidden"}`}>Kanban</div>;
};

export default Kanban;
