import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { Column as ColumnType, KanbanTask } from "@/types/types";
import { LuPlus as AddCard } from "react-icons/lu";
import { CgMoreVerticalAlt as ColumnOptions } from "react-icons/cg";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MeasuringConfiguration,
  MeasuringStrategy,
  PointerSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator as DragHandle } from "react-icons/md";
import { createPortal } from "react-dom";

type Props = {
  openKanbanWidget: boolean;
};

const handleColumnOptions = () => {};

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimation: DropAnimation = {
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          scaleX: 0.98,
          scaleY: 0.98,
          x: transform.final.x - 10,
          y: transform.final.y - 10,
        }),
      },
    ];
  },
  sideEffects: defaultDropAnimationSideEffects({}),
};

function handleDragCancel() {}

function handleDragEnd({ over }: DragEndEvent) {}

const Kanban = ({ openKanbanWidget }: Props) => {
  const columns = useSelector((state: RootState) => state.kanban.columns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleDragStart({ active }: DragStartEvent) {
    if (active.data.current?.type === "ColumnType") {
      setActiveColumn(active.data.current.column);
    }
  }

  return (
    <div
      className={`${openKanbanWidget ? "" : "hidden"} absolute left-96 top-56 z-10 h-[24.75rem] w-[44.5rem] overflow-scroll rounded-xl bg-white shadow-2xl`}
    >
      <DndContext
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        // onDragCancel={handleDragCancel}
        // sensors={sensors}
        // measuring={measuring}
        // collisionDetection={closestCenter}
      >
        <div className="flex h-full w-full flex-1 gap-2 overflow-auto bg-white p-3">
          <SortableContext items={columnsId}>
            {columns.map(({ name, tasks, id }) => {
              return <Column key={id} id={id} name={name} tasks={tasks} />;
            })}
          </SortableContext>
        </div>
        {isClient &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <Column
                  id={activeColumn.id}
                  name={activeColumn.name}
                  tasks={activeColumn.tasks}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};

export const Column = ({ id, name, tasks }: ColumnType) => {
  const column = { id: id, name: name, tasks: tasks };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "ColumnType",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-full min-w-52 shrink-0 flex-col items-center rounded-md bg-neutral-200 p-4"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-full min-w-52 shrink-0 flex-col items-center rounded-md bg-neutral-100 p-4"
    >
      <div className="sticky top-0 mb-3 flex min-w-full items-center justify-between bg-neutral-100">
        <div className="mr-4 flex items-center justify-start">
          <DragHandle size={"22px"} {...attributes} {...listeners} />
          <div className="flex w-full">
            <h3 className={`pointer-events-none font-medium text-neutral-800`}>
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
