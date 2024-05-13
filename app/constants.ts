import type { sidebarItem } from "./types.ts";
import { FaNoteSticky } from "react-icons/fa6";
import { RiTimerFill } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { BsKanban } from "react-icons/bs";
import { BsMusicNoteList } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { PiMatrixLogoFill } from "react-icons/pi";

// Sidebar Buttons

export const sidebarItems: sidebarItem[] = [
  { id: 1, title: "Notes", href: "/notes", icon: FaNoteSticky },
  { id: 2, title: "Timer", href: "/timer", icon: RiTimerFill },
  { id: 3, title: "Todo", href: "/todo", icon: GoTasklist },
  { id: 4, title: "Kanban", href: "/kanban", icon: BsKanban },
  { id: 5, title: "Music", href: "/music", icon: BsMusicNoteList },
  { id: 6, title: "Calendar", href: "/calendar", icon: FaCalendarAlt },
  { id: 7, title: "Matrix", href: "/matrix", icon: PiMatrixLogoFill },
];
