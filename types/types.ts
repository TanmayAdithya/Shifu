import { ReactNode } from "react";
import { IconType } from "react-icons";
export type widgetItem = {
  id: string;
  icon: IconType;
};

export interface WidgetState {
  [key: string]: boolean;
}

export interface OpenWidgetsState {
  widgets: WidgetState;
}

export type background = {
  id: string;
  blur_hash: string;
  color: string;
  height: number;
  width: number;
  urls: {
    raw: string;
    full: string;
  };
  description: string;
};

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface Notes {
  notes: Note[];
}

export interface AddNotePayload {
  title: string;
  content: string;
}

export interface UpdateContentPayload {
  id: string;
  content: string;
}

export interface UpdateTitlePayload {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: KanbanTask[];
}

export interface KanbanBoard {
  columns: Column[];
}

export interface KanbanTask {
  id: string;
  content: string;
}

export interface AddTaskPayload {
  columnId: string;
  taskContent: string;
}

export interface AddColumnPayload {
  name: string;
  tasks: KanbanTask[];
}

export interface CalendarEvent {
  id: string;
  events: Event[];
}

export interface Event {
  id: string;
  details: EventDetails[];
}

export interface EventDetails {
  title: string;
  link?: string;
  start?: string;
  startPeriod?: string;
  end?: string;
  endPeriod?: string;
}

export interface AddEventProps {
  title: string;
  dateId: string;
  link?: string;
  start?: string;
  startPeriod?: string;
  end?: string;
  endPeriod?: string;
}

export interface Tab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}
