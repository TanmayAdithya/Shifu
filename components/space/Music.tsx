"use client";

import React, { useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import { Position } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";
import { Input } from "../ui/input";
import { GrPowerReset as Reset } from "react-icons/gr";

interface SpotifyEmbedProps {
  url: string;
  width?: number;
  height?: number;
  openMusicPlayer: boolean;
  id: string;
  position: Position;
}

const Music: React.FC<SpotifyEmbedProps> = ({
  url,
  openMusicPlayer,
  id,
  position,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const [mediaURL, setMediaURL] = useState<string>(url);

  function handleFormSubmit() {
    console.log(mediaURL);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${openMusicPlayer ? "" : "hidden"} absolute bottom-48 right-96 z-10 h-fit w-[22rem] rounded-3xl border bg-neutral-100 p-1 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className="mx-auto h-1 w-16 rounded-full bg-neutral-400 dark:bg-neutral-700"
        ></div>
      </div>
      <iframe
        src={mediaURL}
        width="100%"
        height="152"
        allow="encrypted-media"
        className="mt-5 w-full rounded-3xl border-0 bg-transparent"
      ></iframe>
      <form
        className="mt-2 flex items-center gap-1"
        onSubmit={handleFormSubmit}
      >
        <Input
          placeholder="Paste link"
          className="rounded-3xl"
          name="media-link"
          onChange={(e) => {
            if (!e.target.value) {
              setMediaURL(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFormSubmit();
            }
          }}
        />
        <div className="cursor-pointer rounded-full p-2 transition-colors duration-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700">
          <Reset size={"18px"} />
        </div>
      </form>

      <div className="absolute right-2 top-1">
        <MinimizeWidget widgetId="Music" />
      </div>
    </div>
  );
};

export default Music;
