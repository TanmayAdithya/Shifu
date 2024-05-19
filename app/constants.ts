import type { navbarItem } from "./types.ts";
import { FaRegNoteSticky as Notes } from "react-icons/fa6";
import { MdOutlineTimer as Timer } from "react-icons/md";
import { MdOutlineTaskAlt as Task } from "react-icons/md";
import { MdOutlineViewKanban as Kanban } from "react-icons/md";
import { MdOutlineLibraryMusic as Music } from "react-icons/md";
import { IoCalendarOutline as Calendar } from "react-icons/io5";
import { PiCheckerboardFill as Matrix } from "react-icons/pi";

// Navbar Buttons

export const navbarItems: navbarItem[] = [
  { id: 1, title: "Notes", href: "/space/notes", icon: Notes },
  { id: 2, title: "Timer", href: "/space/timer", icon: Timer },
  { id: 3, title: "Todo", href: "/space/todo", icon: Task },
  { id: 4, title: "Kanban", href: "/space/kanban", icon: Kanban },
  { id: 5, title: "Calendar", href: "/space/calendar", icon: Calendar },
  { id: 6, title: "Matrix", href: "/space/matrix", icon: Matrix },
];
