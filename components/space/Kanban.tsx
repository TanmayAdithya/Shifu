import React from "react";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  return <div className={`${openKanbanWidget ? "" : false}`}>Kanban</div>;
};

export default Kanban;
