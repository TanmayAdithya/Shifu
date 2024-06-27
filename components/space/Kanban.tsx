import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { KanbanTask } from "@/types/types";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  const columns = useSelector((state: RootState) => state.kanban.columns);
  return (
    <div
      className={`${openKanbanWidget ? "" : "hidden"} absolute left-96 top-56 aspect-video w-[45rem] overflow-scroll rounded-xl bg-white p-6`}
    >
      <div className="flex h-full w-full justify-between gap-3">
        {columns.map(({ name, tasks }) => {
          return <Column name={name} tasks={tasks} />;
        })}
      </div>
    </div>
  );
};

type ColumnProps = {
  name: string;
  tasks: KanbanTask[];
};

export const Column = ({ name, tasks }: ColumnProps) => {
  const active = true;
  const headingColor = "#FFF";
  return (
    <div className="w-52 shrink-0">
      <div className="mb-3 flex items-center">
        <div className="mr-2 aspect-square w-2 rounded-full bg-green-300"></div>
        <h3 className={`text-lg font-medium ${headingColor}`}>{name}</h3>
        <span className="ml-2 rounded-full border border-neutral-300 px-3 py-[2px] text-sm text-neutral-800">
          {tasks.length}
        </span>
      </div>
      <div
        className={`flex h-full w-full flex-col gap-[2px] rounded p-1 transition-colors ${
          active ? "bg-green-100/50" : "bg-neutral-800"
        }`}
      >
        {tasks.map((c) => {
          return <Card />;
        })}

        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

type CardProps = {};

const Card = ({}: CardProps) => {
  return (
    <div
      draggable="true"
      className="cursor-grab rounded border border-neutral-300 bg-neutral-400 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">Test</p>
    </div>
  );
};

export default Kanban;
