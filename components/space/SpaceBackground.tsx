"use client";

import React, { useState } from "react";
import CalendarWidget from "@/components/space/CalendarWidget";
import Kanban from "@/components/space/Kanban";
import Matrix from "@/components/space/Matrix";
import Navbar from "@/components/space/Navbar";
import Notes from "@/components/space/Notes";
import Timer from "@/components/space/Timer";
import Todo from "@/components/space/todo/Todo";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { TiCamera as CameraIcon } from "react-icons/ti";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { WidgetPosition } from "@/types/types";

export default function SpaceBackground() {
  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);
  const { url, portfolio_url, name } = useSelector(
    (state: RootState) => state.background,
  );
  const { setNodeRef } = useDroppable({ id: "background" });

  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition[]>([
    {
      id: "Notes",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Timer",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Todo",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Calendar",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Kanban",
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "Matrix",
      position: {
        x: 0,
        y: 0,
      },
    },
  ]);

  const handleDragEnd = ({ active }: DragEndEvent) => {
    const newWidget = widgetPosition.find((widget) => widget.id === active.id);

    const board = document
      .getElementById("background")
      ?.getBoundingClientRect();
    if (active.rect.current.translated && board && newWidget) {
      newWidget.position.x = active.rect.current.translated?.left - board?.x;
      newWidget.position.y = active.rect.current.translated?.top - board?.y;

      const _positions = widgetPosition.map((item) => {
        if (item.id === newWidget.id) return newWidget;
        return item;
      });
      setWidgetPosition(_positions);
    }
  };

  return (
    <>
      <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <div ref={setNodeRef} id="background" className="h-full w-full">
          <Notes
            openNotesWidget={openWidgets["Notes"]}
            id={widgetPosition[0].id}
            position={widgetPosition[0].position}
          />
          <Timer
            openTimerWidget={openWidgets["Timer"]}
            id={widgetPosition[1].id}
            position={widgetPosition[1].position}
          />
          <Todo
            openTodoWidget={openWidgets["Todo"]}
            id={widgetPosition[2].id}
            position={widgetPosition[2].position}
          />
          <div className="flex justify-center">
            <CalendarWidget
              openCalendarWidget={openWidgets["Calendar"]}
              id={widgetPosition[3].id}
              position={widgetPosition[3].position}
            />
          </div>
          <Kanban
            openKanbanWidget={openWidgets["Kanban"]}
            id={widgetPosition[4].id}
            position={widgetPosition[4].position}
          />
          <Matrix
            openMatrixWidget={openWidgets["Matrix"]}
            id={widgetPosition[5].id}
            position={widgetPosition[5].position}
          />
          <Navbar openWidgets={openWidgets} />
          <span
            id="background-container"
            className="relative block h-full w-full"
          >
            <img
              id="background-image"
              src={url}
              alt="background-image"
              className="pointer-events-none h-full w-full max-w-full select-none object-cover"
            />
            <p className="absolute bottom-2 left-2 flex items-center text-sm text-neutral-800 dark:text-neutral-200">
              <CameraIcon size={"18px"} className="mr-1" />
              <a
                className={` ${portfolio_url ? "underline" : ""} `}
                href={portfolio_url}
                target="_blank"
              >
                {name}
              </a>{" "}
            </p>
          </span>
        </div>
      </DndContext>
    </>
  );
}
