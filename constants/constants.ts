import type { widgetItem } from "../types/types.js";
import { FaRegNoteSticky as Notes } from "react-icons/fa6";
import { MdOutlineTimer as Timer } from "react-icons/md";
import { MdOutlineTaskAlt as Task } from "react-icons/md";
import { MdOutlineViewKanban as Kanban } from "react-icons/md";
import { IoCalendarOutline as Calendar } from "react-icons/io5";
import { PiCheckerboardFill as Matrix } from "react-icons/pi";

// Widget Buttons
export const widgetItems: widgetItem[] = [
  { id: "Notes", icon: Notes },
  { id: "Timer", icon: Timer },
  { id: "Todo", icon: Task },
  { id: "Calendar", icon: Calendar },
  { id: "Kanban", icon: Kanban },
  { id: "Matrix", icon: Matrix },
];
