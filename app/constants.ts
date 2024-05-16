import type { sidebarItem } from "./types.ts";
import { FaNoteSticky as Notes } from "react-icons/fa6";
import { RiTimerFill as Timer } from "react-icons/ri";
import { GoTasklist as Task } from "react-icons/go";
import { BsKanban as Kanban } from "react-icons/bs";
import { BsMusicNoteList as Music } from "react-icons/bs";
import { FaCalendarAlt as Calendar } from "react-icons/fa";
import { PiMatrixLogoFill as Matrix } from "react-icons/pi";

// Sidebar Buttons

export const sidebarItems: sidebarItem[] = [
  { id: 1, title: "Notes", href: "/space/notes", icon: Notes },
  { id: 2, title: "Timer", href: "/space/timer", icon: Timer },
  { id: 3, title: "Todo", href: "/space/todo", icon: Task },
  { id: 4, title: "Kanban", href: "/space/kanban", icon: Kanban },
  { id: 5, title: "Music", href: "/space/music", icon: Music },
  { id: 6, title: "Calendar", href: "/space/calendar", icon: Calendar },
  { id: 7, title: "Matrix", href: "/space/matrix", icon: Matrix },
];
