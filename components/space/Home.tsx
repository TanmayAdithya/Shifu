"use client";

import { useEffect, useRef } from "react";

export default function Home() {
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

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX; // left
      coords.current.startY = e.clientY; // top
    };

    const onMouseUp = () => {
      isClicked.current = false;

      if (box) {
        coords.current.lastX = box.offsetLeft;
        coords.current.lastY = box.offsetTop;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      if (box) {
        box.style.left = `${nextX}px`;
        box.style.top = `${nextY}px`;
      }
    };

    box?.addEventListener("mousedown", onMouseDown);
    box?.addEventListener("mouseup", onMouseUp);
    container?.addEventListener("mousemove", onMouseMove);
    container?.addEventListener("mouseleave", onMouseUp);

    const cleanUp = () => {
      box?.removeEventListener("mousedown", onMouseDown);
      box?.removeEventListener("mouseup", onMouseUp);
      container?.removeEventListener("mousemove", onMouseMove);
      container?.removeEventListener("mouseleave", onMouseUp);
    };
    return cleanUp;
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative h-screen w-full">
        <div
          ref={boxRef}
          className="absolute left-0 top-0 h-[40px] w-[40px] cursor-grab bg-orange-200"
        ></div>
      </div>
    </>
  );
}
