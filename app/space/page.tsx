"use client";

import Calendar from "@/components/space/Calendar";
import Kanban from "@/components/space/Kanban";
import Matrix from "@/components/space/Matrix";
import Navbar from "@/components/space/Navbar";
import Notes from "@/components/space/Notes";
import Timer from "@/components/space/Timer";
import Todo from "@/components/space/todo/Todo";
import { RootState } from "@/store/rootReducer";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600);
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (!boxRef || !containerRef) return;

    const box = boxRef.current;
    const container = containerRef.current;

    function onMouseDown(e: MouseEvent) {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }
    function onMouseUp(e: MouseEvent) {
      isClicked.current = false;

      if (box) {
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
      }
    }
    function onMouseMove(e: MouseEvent) {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      if (box) {
        box.style.left = `${nextX}px`;
        box.style.top = `${nextY}px`;
      }
    }

    box?.addEventListener("mousedown", onMouseDown);
    box?.addEventListener("mouseup", onMouseUp);
    container?.addEventListener("mousemove", onMouseMove);
    container?.addEventListener("mouseleave", onMouseUp);

    function cleanUp() {
      box?.removeEventListener("mousedown", onMouseDown);
      box?.removeEventListener("mouseup", onMouseUp);
      container?.removeEventListener("mousemove", onMouseMove);
      container?.removeEventListener("mouseleave", onMouseUp);
    }

    return cleanUp;
  }, []);

  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);

  return (
    // Container Box
    <div
      ref={containerRef}
      className="h-full w-full bg-gradient-to-r from-[#7B6476] to-[#BC6E75]"
    >
      {/* Test Box */}
      {/* <div
        ref={boxRef}
        className="absolute h-14 w-14 cursor-grab bg-black"
      ></div> */}

      <Notes openNotesWidget={openWidgets["Notes"]} />
      <Timer openTimerWidget={openWidgets["Timer"]} />
      <Todo openTodoWidget={openWidgets["Todo"]} />
      <Kanban openKanbanWidget={openWidgets["Kanban"]} />
      <Matrix openMatrixWidget={openWidgets["Matrix"]} />
      <Calendar openCalendarWidget={openWidgets["Calendar"]} />
      <Navbar openWidgets={openWidgets} />
      <span id="background-container">
        <img
          id="background-image"
          src="/anders-jilden-AkUR27wtaxs-unsplash.jpg"
          alt="background-image"
          className="pointer-events-none h-full w-full max-w-full"
        />
      </span>
    </div>
  );
}
