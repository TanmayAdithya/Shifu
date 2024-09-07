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
import Image from "next/image";
import { useSelector } from "react-redux";

type Props = {};

export default function SpaceBackground({}: Props) {
  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);
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
      <span id="background-container">
        <Image
          id="background-image"
          src="https://images.unsplash.com/photo-1610389151865-5db005614988?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background-image"
          className="pointer-events-none h-full w-full max-w-full select-none object-cover"
          fill={true}
        />
      </span>
    </>
  );
}
