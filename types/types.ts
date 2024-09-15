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
  user: {
    name: string;
    portfolio_url: string;
  };
};

export interface Todo {
  id: string;
  content: string;
  urgent?: boolean;
  important?: boolean;
  status?: "todo" | "in-progress" | "complete";
}

export interface TodosState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
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

export interface CalendarEvent {
  dateId: string;
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

export interface UpdateEventProps {
  id: string;
  dateId: string;
  title?: string;
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

export interface UserDoc {
  _id: string;
  username: string;
  email: string;
  hashed_password: string;
}

export interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

export interface TasksDoc extends Todo {
  user_id: string;
}

export interface NotesDoc extends Note {
  user_id: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface WidgetPosition {
  id: string;
  position: Position;
}
