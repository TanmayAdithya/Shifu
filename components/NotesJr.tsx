"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import CharacterCount from "@tiptap/extension-character-count";
import { useDraggable } from "@dnd-kit/core";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";

type Props = {
  id: string;
  position: { x: number; y: number };
  zIndex: number;
  bringToTop: () => void;
};

export default function DummyNotes({
  id,
  zIndex,
  bringToTop,
  position,
}: Props) {
  const initialNote = `
  <blockquote><p>I care about everything so deeply that I have transcended giving af. I care and Idc that I care, there is no war within me. I am the one who is free.</p></blockquote><ul><li><p>The risk I took was calculated, but man, am I bad at math.</p></li><li><p></p></li></ul> 

  `;
  const [editorContent, setEditorContent] = useState<string>(initialNote);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, CharacterCount],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setEditorContent(newContent);
    },
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 20 + zIndex,
    transform:
      transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } as React.CSSProperties;

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseDown={bringToTop}
      className="flex h-[20rem] w-[20rem] rounded-xl border border-neutral-100 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900 md:absolute"
    >
      <div className="absolute left-0 top-2 w-full opacity-0 md:opacity-100">
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto ${isGlassMode ? "bg-neutral-500 dark:bg-neutral-300" : "bg-neutral-400 dark:bg-neutral-700"} h-1 w-16 rounded-full`}
        ></div>
      </div>
      <div className="w-full overflow-auto p-4">
        <h2 className="pointer-events-none select-none text-center font-medium text-neutral-800 dark:text-neutral-100">
          Notes
        </h2>

        <EditorContent
          id="editor-wrapper"
          className="prose-code:after:content=[''] text-md prose block py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-p:text-neutral-800 prose-blockquote:my-1 prose-code:bg-transparent prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1 dark:prose-headings:text-neutral-200 dark:prose-p:text-neutral-200 dark:prose-blockquote:text-neutral-300 dark:prose-strong:text-neutral-200 dark:prose-code:bg-neutral-800 dark:prose-code:bg-transparent dark:prose-code:text-neutral-300 dark:prose-pre:rounded-md dark:prose-pre:border dark:prose-pre:border-neutral-700 dark:prose-pre:bg-neutral-900 dark:prose-pre:text-neutral-300"
          editor={editor}
          autoFocus
        />
      </div>
    </div>
  );
}
