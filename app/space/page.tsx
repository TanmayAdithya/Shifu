"use client";

import { useEffect, useRef } from "react";

export default function page() {
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
