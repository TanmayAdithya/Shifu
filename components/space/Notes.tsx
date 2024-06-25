"use client";

import { useEffect, useRef, useState } from "react";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";
import { MdModeEdit as EditTitle } from "react-icons/md";
import { MdDelete as DeleteNote } from "react-icons/md";
import { IoClose as ExitEditMode } from "react-icons/io5";
import {
  addNote,
  deleteNote,
  updateNoteContent,
  updateNoteTitle,
} from "@/store/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { Note } from "@/types/types";
import { EditorContent, useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

type Props = {};

export default function Notes({}: Props) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openNote, setOpenNote] = useState<Note | null>(
    notes.length > 0 ? notes[0] : null,
  );
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [originalTitle, setOriginalTitle] = useState<string>(
    openNote ? openNote.title : "",
  );
  const [newTitle, setNewTitle] = useState<string>(
    openNote ? openNote.title : "",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle],
    content: openNote ? openNote.content : "",
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
    if (openNote) {
      dispatch(
        updateNoteContent({
          id: openNote.id,
          content: newContent,
        }),
      );
      setOpenNote({ ...openNote, content: newContent });
    }
  }

  function handleTitleChange(newTitle: string) {
    if (openNote) {
      dispatch(updateNoteTitle({ id: openNote.id, title: newTitle }));
      setOpenNote({ ...openNote, title: newTitle });
    }
  }

  const handleExitEditMode = () => {
    if (openNote) {
      setOpenNote({ ...openNote, title: originalTitle });
    }
    setEditTitle(false);
  };

  useEffect(() => {
    if (openNote) {
      setNewTitle(openNote.title);
    }
  }, [openNote]);

  useEffect(() => {
    if (editTitle && inputRef.current) {
      inputRef.current.select();
    }
  }, [editTitle]);

  function handleDeleteNote(noteId: string) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    dispatch(deleteNote(noteId));

    if (openNote) {
      if (notes.length === 1) {
        setOpenNote(null);
        editor?.commands.setContent("");
      } else if (noteIndex === notes.length - 1) {
        setOpenNote(notes[noteIndex - 1]);
        setNewTitle(openNote.title);
        editor?.commands.setContent(notes[noteIndex - 1].content);
      } else {
        setOpenNote(notes[noteIndex + 1]);
        setNewTitle(openNote.title);
        editor?.commands.setContent(notes[noteIndex + 1].content);
      }
    }
    dispatch(deleteNote(noteId));
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery?.toLowerCase()),
  );

  return (
    <div className="absolute left-56 top-20 flex h-[30rem] min-w-[192px] rounded-xl bg-white shadow-lg">
      <aside className="min-w-[14.5rem] overflow-auto rounded-l-xl border-r border-r-neutral-200 bg-[#F7F7F7]">
        <div>
          <div className="sticky top-0 w-full bg-[#F7F7F7] px-3 pb-2 pt-3">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className="mb-2 cursor-pointer"
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex w-full items-center gap-2">
              <div className="flex items-center rounded-md border border-[#E8E8E8] bg-white pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-[144px] rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <div className="h-full w-full flex-1 flex-grow-0 cursor-pointer rounded-md bg-[#8F8F8F] p-2 transition-colors duration-100 hover:bg-neutral-700">
                <NewNote size={"17px"} color="#fff" onClick={handleAddNote} />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="flex flex-col gap-2 px-3 pb-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`flex w-full max-w-[13.5rem] cursor-pointer list-none items-center justify-between rounded-lg border border-[#E8E8E8] p-2 text-neutral-900 transition-colors duration-100 hover:bg-neutral-200 ${openNote?.id === note.id ? "bg-neutral-200 hover:bg-neutral-200" : "bg-white"}`}
                onClick={() => handleOpenNote(note)}
              >
                <span className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {note.title}
                </span>

                <DeleteNote
                  className="flex-shrink-0 flex-grow-0 cursor-pointer text-neutral-600 hover:text-neutral-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className="w-[30rem] overflow-auto rounded-e-xl bg-white p-4">
        <div>
          <div className="flex justify-center">
            {editTitle && openNote ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={openNote.title}
                  ref={inputRef}
                  className="max-w-40 rounded focus:outline-none"
                  onChange={(e) => {
                    handleTitleChange(e.target.value);
                    setNewTitle(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      handleExitEditMode();
                    } else if (e.key === "Enter") {
                      handleTitleChange(newTitle);
                      setEditTitle(false);
                    }
                  }}
                />
                <ExitEditMode
                  className="cursor-pointer text-neutral-600 hover:text-neutral-800"
                  onClick={handleExitEditMode}
                />
              </div>
            ) : openNote ? (
              <h2
                id="note-title"
                className="flex items-center text-balance text-center font-medium text-neutral-800"
              >
                {openNote.title}
                <span>
                  <EditTitle
                    onClick={() => setEditTitle((prev) => !prev)}
                    className="ml-1 cursor-pointer text-neutral-600 hover:text-neutral-800"
                  />
                </span>
              </h2>
            ) : null}
          </div>
        </div>
        {openNote && (
          <EditorContent
            id="editor-wrapper"
            className="prose-code:after:content=[''] text-md prose py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-blockquote:my-1 prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1"
            editor={editor}
          />
        )}
      </div>
    </div>
  );
}
