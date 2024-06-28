import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { Column as ColumnType, KanbanTask } from "@/types/types";
import { LuPlus as AddCard } from "react-icons/lu";
import { CgMoreVerticalAlt as ColumnOptions } from "react-icons/cg";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  openKanbanWidget: boolean;
};

const Kanban = ({ openKanbanWidget }: Props) => {
  const columns = useSelector((state: RootState) => state.kanban.columns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  return (
    <div
      className={`${openKanbanWidget ? "" : "hidden"} absolute left-96 top-56 h-[24.75rem] w-[44.5rem] overflow-scroll rounded-xl bg-white shadow-2xl`}
    >
      <DndContext>
        <div className="flex h-full w-full flex-1 gap-[10px] overflow-auto bg-white p-3">
          <SortableContext items={columnsId}>
            {columns.map(({ name, tasks, id }) => {
              return <Column key={id} id={id} name={name} tasks={tasks} />;
            })}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

const handleColumnOptions = () => {};

export const Column = ({ id, name, tasks }: ColumnType) => {
  const column: ColumnType = { id: id, name: name, tasks: tasks };

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: "Column",
        column,
      },
    });

  const style = {
    transition,

    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex h-full min-w-52 shrink-0 flex-col items-center rounded-md bg-neutral-100 p-4"
    >
      <div className="sticky top-0 mb-3 flex min-w-full items-center justify-between bg-neutral-100">
        <div className="mr-4 flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-300"></div>
          <div className="flex w-full">
            <h3
              className={`text-md pointer-events-none font-medium text-neutral-800`}
            >
              {name}
            </h3>
            <span className="pointer-events-none ml-2 rounded-full border border-neutral-300 px-3 py-[2px] text-sm text-neutral-800">
              {tasks.length}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <AddCard
            size={"20px"}
            className="cursor-pointer text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
          />
          <ColumnOptions
            size={"20px"}
            className="cursor-pointer text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
            onClick={handleColumnOptions}
          />
        </div>
      </div>
      <div
        className={`flex h-full w-full flex-col gap-1 overflow-y-scroll transition-colors`}
      >
        {tasks.map((c) => {
          return <Card key={c.id} content={c.content} />;
        })}
      </div>
    </div>
  );
};

type CardProps = {
  content: string;
};

const Card = ({ content }: CardProps) => {
  return (
    <div
      draggable="true"
      className="mr-2 cursor-grab rounded-md border border-neutral-400 bg-neutral-50 p-3 active:cursor-grabbing"
    >
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Kanban;
