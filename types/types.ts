import { ReactNode } from "react";
import { IconType } from "react-icons";

export type widgetItem = {
  id: string;
  icon: IconType;
};

export interface WidgetState {
  id: string;
  visibility: boolean;
  position: Position;
  order: number;
}

export interface OpenWidgetsState {
  widgets: WidgetState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
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
  _id: string;
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

export interface Videos {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export interface VideosState {
  videos: Videos[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  muted: boolean;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
}

export interface Notes {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface AddNotePayload {
  title: string;
  content: string;
}

export interface UpdateContentPayload {
  _id: string;
  content: string;
}

export interface UpdateTitlePayload {
  _id: string;
  title: string;
}

export interface Column {
  id: string;
  column_name: string;
  color: string;
  tasks: Todo[];
}

export interface KanbanBoard {
  columns: Column[];
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

export interface WidgetDoc extends WidgetState {
  user_id: string;
}

export interface NotesDoc extends Note {
  user_id: string;
}

export interface BackgroundState {
  active: "image" | "video";
  mediaRef: string;
  name?: string | null;
  portfolio_url?: string | null;
  backgrounds: background[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export interface BackgroundDoc extends BackgroundState {
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

interface RelatedPlaylists {
  uploads: string;
}

interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

interface Item {
  contentDetails: ContentDetails;
}

export interface ChannelIdResponse {
  items: Item[];
}
