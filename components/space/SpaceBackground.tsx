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
import { useSelector } from "react-redux";

type Props = {};

export default function SpaceBackground({}: Props) {
  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);
  const backgroundUrl = useSelector((state: RootState) => state.background.url);
  return (
    <>
      <Notes openNotesWidget={openWidgets["Notes"]} />
      <Timer openTimerWidget={openWidgets["Timer"]} />
      <Todo openTodoWidget={openWidgets["Todo"]} />
      <Kanban openKanbanWidget={openWidgets["Kanban"]} />
      <Matrix openMatrixWidget={openWidgets["Matrix"]} />
      <div className="flex justify-center">
        <CalendarWidget openCalendarWidget={openWidgets["Calendar"]} />
      </div>
      <Navbar openWidgets={openWidgets} />
      <span id="background-container" className="relative block h-full w-full">
        <img
          id="background-image"
          src={backgroundUrl}
          alt="background-image"
          className="pointer-events-none h-full w-full max-w-full select-none object-cover"
        />
      </span>
    </>
  );
}
