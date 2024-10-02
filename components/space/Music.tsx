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
  zIndex: number;
  bringToTop: () => void;
}

const Music: React.FC<SpotifyEmbedProps> = ({
  url,
  openMusicPlayer,
  id,
  position,
  zIndex,
  bringToTop,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const [mediaURL, setMediaURL] = useState<string>(url);
  const [inputValue, setInputValue] = useState<string>("");
  const [iframeKey, setIframeKey] = useState(0);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanURL = inputValue.split("?")[0];

    const albumMatch = cleanURL.match(/album\/([a-zA-Z0-9]+)/);
    const playlistMatch = cleanURL.match(/playlist\/([a-zA-Z0-9]+)/);
    const trackMatch = cleanURL.match(/track\/([a-zA-Z0-9]+)/);

    let spotifyId: string | undefined;
    let type: string | undefined;

    if (albumMatch) {
      spotifyId = albumMatch[1];
      type = "album";
    } else if (playlistMatch) {
      spotifyId = playlistMatch[1];
      type = "playlist";
    } else if (trackMatch) {
      spotifyId = trackMatch[1];
      type = "track";
    } else {
      const nonEmbedMatch = cleanURL.match(
        /open\.spotify\.com\/(album|playlist|track)\/([a-zA-Z0-9]+)/,
      );
      if (nonEmbedMatch) {
        spotifyId = nonEmbedMatch[2];
        type = nonEmbedMatch[1];
      }
    }

    if (spotifyId && type) {
      const embedUrl = `https://open.spotify.com/embed/${type}/${spotifyId}`;
      setMediaURL(embedUrl);
      setIframeKey((prev) => prev + 1);
      setInputValue("");
    } else {
      alert(
        "Invalid Spotify URL. Please enter a valid album, playlist, or track link.",
      );
    }
  }

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className={`${openMusicPlayer ? "" : "hidden"} ${isGlassMode ? "bg-opacity-30 backdrop-blur-xl dark:bg-opacity-80" : "dark:border-neutral-800"} absolute bottom-48 right-96 h-fit w-[22rem] rounded-3xl border bg-neutral-100 p-1 dark:bg-neutral-900`}
    >
      <div className="absolute left-0 top-2 w-full">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-600 dark:bg-neutral-400" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>
      <iframe
        key={iframeKey}
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
          className={`${isGlassMode ? "placeholder:text-neutral-200 dark:border-neutral-600" : ""} rounded-3xl`}
          name="media-link"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFormSubmit(e);
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
