"use client";

import { useEffect, useState } from "react";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";
import {
  addNote,
  removeNote,
  updateNoteContent,
} from "@/store/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { Note } from "@/types/types";
import { EditorContent, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

type Props = {};

export default function Notes({}: Props) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [openNote, setOpenNote] = useState<Note>(notes[0]);
  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [StarterKit, Underline, Color, TextStyle],
    content: openNote.content,
    autofocus: true,
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
  });

  function handleAddNote() {
    let payload = { title: "Untitled", content: "" };
    dispatch(addNote(payload));
  }

  const handleOpenNote = (note: Note) => {
    setOpenNote(note);
    editor?.commands.setContent(note.content);
  };

  function handleContentChange(newContent: string) {
    if (openNote)
      dispatch(
        updateNoteContent({
          id: openNote.id,
          content: newContent,
        }),
      );
    setOpenNote({ ...openNote, content: newContent });
  }

  return (
    <div className="absolute left-56 top-20 flex h-[30rem] min-w-[192px] rounded-xl bg-white shadow-lg">
      <aside className="min-w-[14.5rem] overflow-auto rounded-l-xl border-r border-r-neutral-200 bg-[#F7F7F7]">
        <div>
          <div className="sticky top-0 bg-[#F7F7F7] px-3 pb-2 pt-3">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className="mb-2 cursor-pointer"
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center rounded-md border border-[#E8E8E8] bg-white pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-[144px] rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                />
              </div>
              <div className="h-full w-full flex-1 flex-grow cursor-pointer rounded-md bg-[#8F8F8F] p-2 transition-colors duration-100 hover:bg-neutral-700">
                <NewNote size={"17px"} color="#fff" onClick={handleAddNote} />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="flex flex-col gap-2 px-3 pb-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="w-full cursor-pointer list-none rounded-lg border border-[#E8E8E8] bg-white p-2 text-neutral-900 transition-colors duration-100 hover:bg-neutral-200"
                onClick={() => handleOpenNote(note)}
              >
                {note.title}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className="w-[30rem] overflow-auto rounded-e-xl bg-white p-4">
        <h2 id="note-title" className="text-center text-neutral-700">
          {openNote.title}
        </h2>
        <EditorContent
          id="editor-wrapper"
          className="prose-code:after:content=[''] text-md prose py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-blockquote:my-1 prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1"
          editor={editor}
        />
      </div>
    </div>
  );
}
