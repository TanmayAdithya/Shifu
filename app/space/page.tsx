"use client";

import Draggable from "react-draggable";

export default function page() {
  return (
    <div className="h-full w-full bg-neutral-500">
      <Draggable bounds="parent">
        <div className="absolute h-14 w-14 cursor-grab bg-black"></div>
      </Draggable>
    </div>
  );
}
