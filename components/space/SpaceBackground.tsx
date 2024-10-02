"use client";

import React, { useCallback, useEffect, useState } from "react";
import CalendarWidget from "@/components/space/CalendarWidget";
import Kanban from "@/components/space/Kanban";
import Matrix from "@/components/space/Matrix";
import Navbar from "@/components/space/Navbar";
import Notes from "@/components/space/Notes";
import Timer from "@/components/space/Timer";
import Todo from "@/components/space/todo/Todo";
import { RootState } from "@/store/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { TiCamera as CameraIcon } from "react-icons/ti";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  bringWidgetToTop,
  loadWidgets,
  saveWidgets,
  updatePosition,
} from "@/store/slices/widgetSlice";
import MusicPlayer from "./Music";
import ReactPlayer from "react-player/youtube";
import { TailSpin } from "react-loader-spinner";
import { AppDispatch } from "@/store/store";

export default function SpaceBackground() {
  const openWidgets = useSelector((state: RootState) => state.widgets.widgets);
  const dispatch: AppDispatch = useDispatch();
  const { portfolio_url, name, active, mediaRef } = useSelector(
    (state: RootState) => state.background,
  );
  const { setNodeRef } = useDroppable({ id: "background" });

  const [loading, setLoading] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);

  useEffect(() => {
    dispatch(loadWidgets());
  }, [dispatch]);

  useEffect(() => {
    if (active === "video") {
      setLoading(true);
    }
  }, [mediaRef, active]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleStart = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
      setMute(false);
    }, 3000);
  }, [mediaRef]);

  const handleDragEnd = ({ active }: DragEndEvent) => {
    const newWidget = openWidgets.find((widget) => widget.id === active.id);
    const board = document
      .getElementById("background")
      ?.getBoundingClientRect();

    if (active.rect.current.translated && board && newWidget) {
      const updatedX = active.rect.current.translated.left - board.x;
      const updatedY = active.rect.current.translated.top - board.y;

      const updatedWidget = {
        ...newWidget,
        position: {
          ...newWidget.position,
          x: updatedX,
          y: updatedY,
        },
      };

      dispatch(
        updatePosition({
          id: updatedWidget.id,
          position: { x: updatedX, y: updatedY },
        }),
      );
      dispatch(bringWidgetToTop(updatedWidget.id));

      const updatedWidgets = openWidgets.map((w) =>
        w.id === updatedWidget.id ? updatedWidget : w,
      );

      dispatch(saveWidgets(updatedWidgets));
    }
  };

  return (
    <>
      <DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <div ref={setNodeRef} id="background" className="h-full w-full">
          <Notes
            openNotesWidget={openWidgets[0].visibility}
            id={openWidgets[0].id}
            position={openWidgets[0].position}
            zIndex={openWidgets[0].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[0].id))}
          />
          <Timer
            openTimerWidget={openWidgets[1].visibility}
            id={openWidgets[1].id}
            position={openWidgets[1].position}
            zIndex={openWidgets[1].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[1].id))}
          />
          <Todo
            openTodoWidget={openWidgets[2].visibility}
            id={openWidgets[2].id}
            position={openWidgets[2].position}
            zIndex={openWidgets[2].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[2].id))}
          />
          <CalendarWidget
            openCalendarWidget={openWidgets[3].visibility}
            id={openWidgets[3].id}
            position={openWidgets[3].position}
            zIndex={openWidgets[3].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[3].id))}
          />
          <Kanban
            openKanbanWidget={openWidgets[4].visibility}
            id={openWidgets[4].id}
            position={openWidgets[4].position}
            zIndex={openWidgets[4].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[4].id))}
          />
          {/* <Matrix
            openMatrixWidget={openWidgets[5].visibility}
            id={openWidgets[5].id}
            position={openWidgets[5].position}
            zIndex={openWidgets[5].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[5].id))}
          /> */}
          <MusicPlayer
            openMusicPlayer={openWidgets[5].visibility}
            id={openWidgets[5].id}
            position={openWidgets[5].position}
            zIndex={openWidgets[5].order}
            bringToTop={() => dispatch(bringWidgetToTop(openWidgets[5].id))}
            url="https://open.spotify.com/embed/album/1bwbZJ6khPJyVpOaqgKsoZ?utm_source=generator"
          />
          <Navbar openWidgets={openWidgets} />
          <span
            id="background-container"
            className="fixed h-screen w-screen overflow-hidden"
          >
            {/* Loading state */}
            {loading && (
              <div className="absolute z-10 flex h-full w-full items-center justify-center bg-neutral-900/90 backdrop-blur-xl">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              </div>
            )}
            {/* Image */}
            {active === "image" && (
              <img
                id="background-image"
                src={mediaRef}
                alt="background-image"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Video */}
            {isClient && active === "video" && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${mediaRef}`}
                className={`video-player pointer-events-none transition-opacity duration-700 ${
                  loading ? "opacity-0" : "opacity-100"
                } absolute object-cover object-center`}
                playing={active === "video"}
                loop
                muted={mute}
                controls={false}
                width={"100vw"}
                height={"100vh"}
                onReady={handleReady}
                onStart={handleStart}
                config={
                  {
                    youtube: {
                      playerVars: {
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        fs: 0,
                        autoplay: 1,
                        loop: 1,
                        iv_load_policy: 3,
                        disablekb: 1,
                        enablejsapi: 1,
                        start: 20,
                      },
                    },
                  } as any
                }
              />
            )}
            {active === "image" && (
              <p className="absolute bottom-2 left-2 flex items-center text-sm text-neutral-800 dark:text-neutral-200">
                <CameraIcon size={"18px"} className="mr-1" />
                <a
                  className={` ${portfolio_url ? "underline" : ""} `}
                  href={portfolio_url ? portfolio_url : ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              </p>
            )}
          </span>
        </div>
      </DndContext>
    </>
  );
}
