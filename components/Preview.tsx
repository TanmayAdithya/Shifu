"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import TimerJr from "./TimerJr";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/rootReducer";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import NotesJr from "./NotesJr";
import {
  bringPreviewWidgetToTop,
  updatePreviewPosition,
} from "@/store/slices/previewSlice";
import TodoJr from "./TodoJr";

type Props = {};

const Preview = (props: Props) => {
  const previewWidgets = useSelector(
    (state: RootState) => state.preview.widgets,
  );
  const dispatch: AppDispatch = useDispatch();
  const { setNodeRef } = useDroppable({ id: "preview" });
  const handleDragEnd = ({ active }: DragEndEvent) => {
    const newWidget = previewWidgets.find((widget) => widget.id === active.id);
    const board = document.getElementById("preview")?.getBoundingClientRect();

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
        updatePreviewPosition({
          id: updatedWidget.id,
          position: { x: updatedX, y: updatedY },
        }),
      );
      dispatch(bringPreviewWidgetToTop(updatedWidget.id));

      const updatedWidgets = previewWidgets.map((w) =>
        w.id === updatedWidget.id ? updatedWidget : w,
      );
    }
  };
  return (
    <DndContext modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
      <div
        ref={setNodeRef}
        id="preview"
        className="flex h-fit w-full flex-col items-center justify-center gap-5 rounded-3xl py-6 md:relative md:h-full md:py-0"
      >
        <NotesJr
          id={previewWidgets[0].id}
          position={previewWidgets[0].position}
          zIndex={previewWidgets[0].order}
          bringToTop={() =>
            dispatch(bringPreviewWidgetToTop(previewWidgets[0].id))
          }
        />
        <TodoJr
          id={previewWidgets[2].id}
          position={previewWidgets[2].position}
          zIndex={previewWidgets[2].order}
          bringToTop={() =>
            dispatch(bringPreviewWidgetToTop(previewWidgets[2].id))
          }
        />
        <TimerJr
          id={previewWidgets[1].id}
          position={previewWidgets[1].position}
          zIndex={previewWidgets[1].order}
          bringToTop={() =>
            dispatch(bringPreviewWidgetToTop(previewWidgets[1].id))
          }
        />
      </div>
    </DndContext>
  );
};

export default Preview;
