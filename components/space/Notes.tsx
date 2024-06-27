"use client";

import { useEffect, useRef, useState } from "react";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";
import { MdModeEdit as EditTitle } from "react-icons/md";

import { PiTrashSimpleBold as DeleteNote } from "react-icons/pi";
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
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

type Props = {
  openNotesWidget: boolean;
};

export default function Notes({ openNotesWidget }: Props) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
  const [openNote, setOpenNote] = useState<Note | null>(
    notes.length > 0 ? notes[0] : null,
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [originalTitle, setOriginalTitle] = useState<string>(
    openNote ? openNote.title : "",
  );
  const [newTitle, setNewTitle] = useState<string>(
    openNote ? openNote.title : "",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      CharacterCount,
      CodeBlockLowlight.extend({
        addNodeview() {
          return ReactNodeViewRenderer(CodeBlockLowlight);
        },
      }).configure({ lowlight }),
    ],
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

    setOriginalTitle(newTitle);
  }

  const handleExitEditMode = () => {
    if (openNote) {
      setOpenNote({ ...openNote, title: originalTitle });
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.select();
    }
  }, [editMode]);

  useEffect(() => {
    if (openNote) {
      setNewTitle(openNote.title);
    }
  }, [openNote]);

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

  function handleSidebarToggle() {
    setSidebarToggle((prev) => !prev);
  }

  return (
    <div
      className={`absolute left-20 top-20 flex h-[30rem] w-auto rounded-xl bg-transparent shadow-lg ${openNotesWidget ? "" : "hidden"} `}
    >
      <aside
        className={`min-w-[14.5rem] ${sidebarToggle ? "" : "z-10"} overflow-auto rounded-l-xl border-r border-r-neutral-200 bg-[#F7F7F7]`}
      >
        <div>
          <div className="sticky top-0 w-full bg-[#F7F7F7] px-3 pb-2 pt-3">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className={`mb-2 cursor-pointer`}
                onClick={handleSidebarToggle}
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex w-full items-center gap-2">
              <div className="flex items-center rounded-md border border-neutral-400/60 bg-white pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-[144px] rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <div
                className="h-full w-full flex-1 flex-grow-0 cursor-pointer rounded-md border border-neutral-400/60 bg-white p-2 transition-colors duration-100 hover:bg-neutral-200"
                onClick={handleAddNote}
              >
                <NewNote size={"17px"} className="text-neutral-500" />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="flex flex-col gap-2 px-3 pb-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`flex w-full max-w-[13.5rem] cursor-pointer list-none items-center justify-between rounded-lg border border-neutral-400/60 p-2 text-neutral-900 transition-colors duration-100 hover:bg-neutral-200 ${openNote?.id === note.id ? "bg-neutral-200 hover:bg-neutral-200" : "bg-white"}`}
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
      <div
        className={`relative h-[100%] w-[25rem] ${sidebarToggle ? "rounded-e-xl" : "z-20 -translate-x-[15rem] rounded-xl border border-neutral-300"} overflow-auto bg-white p-4 transition-all duration-700`}
      >
        <div>
          <SidebarIcon
            color="#737373"
            size={"24px"}
            className={`${sidebarToggle ? "pointer-events-none opacity-0" : "opacity-100"} absolute mb-2 cursor-pointer transition-opacity duration-700`}
            onClick={handleSidebarToggle}
          />

          <div className="flex justify-center">
            {editMode && openNote ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTitle}
                  ref={inputRef}
                  className="max-w-40 rounded focus:outline-none"
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setNewTitle(originalTitle);
                      handleExitEditMode();
                    } else if (e.key === "Enter") {
                      handleTitleChange(newTitle);
                      setEditMode(false);
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
                    onClick={() => setEditMode((prev) => !prev)}
                    className="ml-1 cursor-pointer text-neutral-600 hover:text-neutral-800"
                  />
                </span>
              </h2>
            ) : null}
          </div>
        </div>
        <div className="relative">
          {openNote && (
            <EditorContent
              id="editor-wrapper"
              className="prose-code:after:content=[''] text-md prose py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-blockquote:my-1 prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1"
              editor={editor}
            />
          )}
        </div>
      </div>
      <div
        className={`${sidebarToggle ? "" : "z-30 -translate-x-[15rem]"} absolute bottom-0 right-0 flex justify-end rounded-br-xl rounded-tl-xl border border-neutral-100 bg-neutral-50 px-2 py-1 text-sm font-light drop-shadow-sm transition-transform duration-700`}
      >
        <span className="mr-2">
          {editor?.storage.characterCount.words() + " words"}
        </span>
        <span>
          {editor?.storage.characterCount.characters() + " characters"}
        </span>
      </div>
    </div>
  );
}
