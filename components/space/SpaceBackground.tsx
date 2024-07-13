import React from "react";

import Calendar from "@/components/space/Calendar";
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
      <Calendar openCalendarWidget={openWidgets["Calendar"]} />
      <Navbar openWidgets={openWidgets} />
      <span id="background-container">
        <Image
          id="background-image"
          src="/parco-chan-unsplash.jpg"
          alt="background-image"
          className="pointer-events-none h-full w-full max-w-full object-cover"
          fill={true}
        />
      </span>
    </>
  );
}
