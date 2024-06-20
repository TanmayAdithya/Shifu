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
