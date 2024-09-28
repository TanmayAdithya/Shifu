"use client";

import React, { useState } from "react";
import MinimizeWidget from "./MinimizeWidget";
import { Position } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";
import { Input } from "../ui/input";
import { GrPowerReset as Reset } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

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

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${openMusicPlayer ? "" : "hidden"} ${isGlassMode ? "bg-opacity-30 backdrop-blur-xl dark:bg-opacity-80" : "dark:border-neutral-800"} absolute bottom-48 right-96 z-20 h-fit w-[22rem] rounded-3xl border bg-neutral-100 p-1 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-600 dark:bg-neutral-400" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
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
          placeholder="Paste Spotify link"
          className={` ${isGlassMode ? "placeholder:text-neutral-200 dark:border-neutral-600" : ""} rounded-3xl`}
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
        <div
          className={`cursor-pointer rounded-full p-2 transition-colors duration-300 ${isGlassMode ? "bg-neutral-100/60 text-neutral-700 hover:bg-neutral-200" : "bg-neutral-700 text-neutral-300 hover:bg-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"} `}
        >
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
