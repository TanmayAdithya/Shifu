"use client";

import { useEffect, useRef, useState } from "react";
import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { RiStickyNoteAddLine as NewNote } from "react-icons/ri";
import { MdModeEdit as EditTitle } from "react-icons/md";
import { PiTrashSimpleBold as DeleteNote } from "react-icons/pi";
import { IoClose as ExitEditMode } from "react-icons/io5";
import {
  addNewNote,
  deleteNote,
  fetchNotes,
  removeNote,
  updateNote,
} from "@/store/slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { Note, Position } from "@/types/types";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import MinimizeWidget from "./MinimizeWidget";
import { Input } from "../ui/input";
import { useDraggable } from "@dnd-kit/core";
import { AppDispatch } from "@/store/store";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  openNotesWidget: boolean;
  id: string;
  position: Position;
  zIndex: number;
  bringToTop: () => void;
};

export default function Notes({
  openNotesWidget,
  id,
  zIndex,
  bringToTop,
  position,
}: Props) {
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
  const dispatch: AppDispatch = useDispatch();
  const lowlight = createLowlight(all);

  const [editorContent, setEditorContent] = useState<string>(
    openNote?.content || "",
  );
  const debouncedContent = useDebounce(editorContent, 1000);
  const lastContentRef = useRef<string>(openNote ? openNote.content : "");

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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: openNote ? openNote.content : "",
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setEditorContent(newContent);
    },
  });

  function handleAddNote() {
    let newNote = { title: "Untitled", content: "" };
    dispatch(addNewNote(newNote))
      .unwrap()
      .then((createdNote: Note) => {
        setOpenNote(createdNote);
        setEditorContent("");
        setNewTitle("Untitled");
      })
      .catch((error) => {
        console.error("Failed to create a new note", error);
      });
  }

  const handleOpenNote = (note: Note) => {
    setOpenNote(note);
    setEditorContent(note.content);
    lastContentRef.current = note.content;
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    if (openNote) {
      setEditorContent(openNote.content);
      lastContentRef.current = openNote.content;
      editor?.commands.setContent(openNote.content);
    }
  }, [openNote, editor]);

  const handleContentChange = (newContent: string) => {
    if (openNote && newContent !== lastContentRef.current) {
      lastContentRef.current = newContent;
      dispatch(
        updateNote({
          _id: openNote._id,
          updates: { content: newContent },
        }),
      );
      setOpenNote({ ...openNote, content: newContent });
    }
  };

  useEffect(() => {
    if (debouncedContent !== openNote?.content) {
      handleContentChange(debouncedContent);
    }
  }, [debouncedContent]);

  function handleTitleChange(newTitle: string) {
    if (openNote) {
      dispatch(updateNote({ _id: openNote._id, updates: { title: newTitle } }));
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
    const noteIndex = notes.findIndex((note) => note._id === noteId);
    dispatch(deleteNote(noteId));

    if (openNote && openNote._id === noteId) {
      if (notes.length === 1) {
        setOpenNote(null);
        setEditorContent("");
      } else {
        const nextNoteIndex =
          noteIndex === notes.length - 1 ? noteIndex - 1 : noteIndex + 1;
        setOpenNote(notes[nextNoteIndex]);
        setEditorContent(notes[nextNoteIndex].content);
      }
    }
    dispatch(removeNote(noteId));
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
      className={`absolute flex h-[30rem] rounded-xl bg-transparent shadow-xl transition-[width] duration-500 ${
        openNotesWidget ? "" : "hidden"
      } overflow-hidden ${sidebarToggle ? "w-[39.5rem]" : "w-[25rem]"}`}
    >
      <div className={`absolute left-0 top-2 z-30 w-full`}>
        <div
          {...listeners}
          {...attributes}
          className={`mx-auto h-1 w-24 rounded-full ${isGlassMode ? "bg-neutral-600 dark:bg-neutral-400" : "bg-neutral-400 dark:bg-neutral-700"}`}
        ></div>
      </div>

      <aside
        className={`transition-all duration-500 ${
          sidebarToggle
            ? "visibility-visible w-[14.5rem] opacity-100"
            : "visibility-hidden w-0 opacity-0"
        } rounded-l-xl border-r ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : "dark:bg-neutral-900"} h-full border-r-neutral-200 shadow-md dark:border-r-neutral-800`}
      >
        <div className="h-full">
          <div
            className={` ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} w-full rounded-tl-xl bg-white px-3 pb-2 pt-3 dark:bg-neutral-900`}
          >
            {/* Sidebar */}
            <span>
              <SidebarIcon
                size={"24px"}
                className={`mb-2 cursor-pointer ${isGlassMode ? "text-neutral-800 dark:text-neutral-400" : "text-[#737373]"}`}
                onClick={handleSidebarToggle}
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex w-full items-center justify-start gap-2">
              <div
                className={` ${isGlassMode ? "bg-opacity-50 backdrop-blur dark:bg-opacity-80" : "bg-white dark:bg-neutral-900"} flex w-[164.6px] items-center rounded-md dark:border-0`}
              >
                <Input
                  type="text"
                  placeholder="Search notes"
                  className={`w-full ${isGlassMode ? "focus-visible:ring-transparent" : ""} border-neutral-300/80 dark:border-neutral-400/15`}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              <div
                className={` ${isGlassMode ? "bg-opacity-50 backdrop-blur hover:bg-neutral-50 dark:bg-opacity-80" : "hover:bg-neutral-200"} h-[36px] cursor-pointer rounded-md border border-neutral-400/60 bg-white p-2 text-neutral-500 transition-colors duration-150 dark:border-neutral-400/15 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-800`}
                onClick={handleAddNote}
              >
                <NewNote size={"17px"} />
              </div>
            </div>
          </div>
          {/* Notes List*/}
          <div
            className={`flex h-full max-h-[24rem] flex-col gap-2 overflow-auto rounded-bl-xl bg-white px-3 pb-2 dark:bg-neutral-900 ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""}`}
          >
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`flex w-full max-w-[13.5rem] cursor-pointer list-none items-center justify-between rounded-lg border p-2 text-neutral-900 transition-colors duration-100 hover:bg-neutral-200 dark:border-neutral-400/15 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-800 ${isGlassMode ? "bg-opacity-60 backdrop-blur dark:bg-opacity-60" : ""} ${openNote?._id === note._id ? "bg-neutral-200/70 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-neutral-100" : "border-neutral-300/80 bg-white dark:bg-neutral-900 dark:text-neutral-300"}`}
                onClick={() => handleOpenNote(note)}
              >
                <span className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {note.title}
                </span>
                <DeleteNote
                  className="flex-shrink-0 flex-grow-0 cursor-pointer transition-colors duration-150 dark:hover:text-neutral-950"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note._id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div
        className={`${isGlassMode ? "bg-opacity-40 backdrop-blur-xl dark:bg-opacity-80" : ""} relative h-[100%] w-[25rem] ${sidebarToggle ? "rounded-e-xl" : "z-20 rounded-xl"} overflow-auto bg-white p-4 pl-2 shadow-lg transition-all duration-500 dark:border dark:border-neutral-800 dark:bg-neutral-900`}
      >
        {notes.length === 0 ? (
          <>
            <SidebarIcon
              size={"24px"}
              className={`${sidebarToggle ? "pointer-events-none opacity-0" : "opacity-100"} absolute mb-2 ml-2 cursor-pointer transition-opacity duration-500 ${isGlassMode ? "text-neutral-800 dark:text-neutral-400" : "text-[#737373]"}`}
              onClick={handleSidebarToggle}
            />
            <div className="mx-auto flex h-full w-full items-center justify-center">
              <p className="pointer-events-none text-xl text-neutral-400 dark:text-neutral-600">
                {"Empty thoughts :("}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <SidebarIcon
                size={"24px"}
                className={`${sidebarToggle ? "pointer-events-none opacity-0" : "opacity-100"} absolute mb-2 ml-2 cursor-pointer transition-opacity duration-500 ${isGlassMode ? "text-neutral-800 dark:text-neutral-400" : "text-[#737373]"}`}
                onClick={handleSidebarToggle}
              />

              <div className="flex justify-center">
                {editMode && openNote ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newTitle}
                      ref={inputRef}
                      className={`max-w-40 rounded px-1 focus:outline-none ${isGlassMode ? "bg-white bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""}`}
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
                    className="mt-1 flex items-center text-balance text-center font-medium text-neutral-800 dark:text-neutral-100"
                  >
                    {openNote.title}
                    <span>
                      <EditTitle
                        onClick={() => setEditMode((prev) => !prev)}
                        className="ml-1 cursor-pointer text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                      />
                    </span>
                  </h2>
                ) : null}
              </div>
            </div>
            <div className="relative overflow-auto px-1 pl-3">
              {openNote && (
                <EditorContent
                  id="editor-wrapper"
                  className="prose-code:after:content=[''] text-md prose block py-3 outline-none prose-headings:my-1 prose-p:my-1 prose-p:leading-relaxed prose-p:text-neutral-800 prose-blockquote:my-1 prose-code:bg-transparent prose-code:px-1 prose-code:before:content-[''] prose-ul:my-1 prose-li:my-1 dark:prose-headings:text-neutral-200 dark:prose-p:text-neutral-200 dark:prose-blockquote:text-neutral-300 dark:prose-strong:text-neutral-200 dark:prose-code:bg-neutral-800 dark:prose-code:bg-transparent dark:prose-code:text-neutral-300 dark:prose-pre:rounded-md dark:prose-pre:border dark:prose-pre:border-neutral-700 dark:prose-pre:bg-neutral-900 dark:prose-pre:text-neutral-300"
                  editor={editor}
                />
              )}
            </div>
          </>
        )}
      </div>

      <div
        className={`${sidebarToggle ? "" : "z-30"} ${notes.length === 0 ? "hidden" : ""} pointer-events-none absolute bottom-0 right-0 flex justify-end rounded-br-xl rounded-tl-xl border border-neutral-100 bg-neutral-50 px-2 py-1 text-sm font-light drop-shadow-sm transition-transform duration-500 dark:border-neutral-700 dark:bg-neutral-800`}
      >
        <span className="pointer-events-none mr-2">
          {editor?.storage.characterCount.words() + " words"}
        </span>
        <span>
          {editor?.storage.characterCount.characters() + " characters"}
        </span>
      </div>
      <div className={`absolute right-2 top-2 ${sidebarToggle ? "" : "z-20"}`}>
        <MinimizeWidget widgetId="Notes" />
      </div>
    </div>
  );
}
