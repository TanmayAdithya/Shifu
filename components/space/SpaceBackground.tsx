"use client";

import React from "react";
import CalendarWidget from "@/components/space/CalendarWidget";
import Kanban from "@/components/space/Kanban";
import Matrix from "@/components/space/Matrix";
import Navbar from "@/components/space/Navbar";
import Notes from "@/components/space/Notes";
import Timer from "@/components/space/Timer";
import Todo from "@/components/space/todo/Todo";
import { RootState } from "@/store/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { TiCamera as CameraIcon } from "react-icons/ti";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { updatePosition } from "@/store/slices/widgetSlice";
import MusicPlayer from "./Music";

export default function SpaceBackground() {
  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);
  const dispatch = useDispatch();

  const { url, portfolio_url, name } = useSelector(
    (state: RootState) => state.background,
  );
  const { setNodeRef } = useDroppable({ id: "background" });

  const handleDragEnd = ({ active }: DragEndEvent) => {
    const newWidget = openWidgets.find((widget) => widget.id === active.id);

    const board = document
      .getElementById("background")
      ?.getBoundingClientRect();

    if (active.rect.current.translated && board && newWidget) {
      const updatedX = active.rect.current.translated.left - board.x;
      const updatedY = active.rect.current.translated.top - board.y;

      const updatedWidget = {
        ...newWidget,
        position: {
          ...newWidget.position,
          x: updatedX,
          y: updatedY,
        },
      };

      dispatch(
        updatePosition({
          id: updatedWidget.id,
          position: { x: updatedX, y: updatedY },
        }),
      );
    }
  };

  return (
    <>
      <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <div ref={setNodeRef} id="background" className="h-full w-full">
          <Notes
            openNotesWidget={openWidgets[0].visibility}
            id={openWidgets[0].id}
            position={openWidgets[0].position}
          />
          <Timer
            openTimerWidget={openWidgets[1].visibility}
            id={openWidgets[1].id}
            position={openWidgets[1].position}
          />
          <Todo
            openTodoWidget={openWidgets[2].visibility}
            id={openWidgets[2].id}
            position={openWidgets[2].position}
          />
          <div className="flex justify-center">
            <CalendarWidget
              openCalendarWidget={openWidgets[3].visibility}
              id={openWidgets[3].id}
              position={openWidgets[3].position}
            />
          </div>
          <Kanban
            openKanbanWidget={openWidgets[4].visibility}
            id={openWidgets[4].id}
            position={openWidgets[4].position}
          />
          <Matrix
            openMatrixWidget={openWidgets[5].visibility}
            id={openWidgets[5].id}
            position={openWidgets[5].position}
          />
          <MusicPlayer
            openMusicPlayer={openWidgets[6].visibility}
            id={openWidgets[6].id}
            position={openWidgets[6].position}
            url="https://open.spotify.com/embed/album/1bwbZJ6khPJyVpOaqgKsoZ?utm_source=generator"
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
              </a>
            </p>
          </span>
        </div>
      </DndContext>
    </>
  );
}
