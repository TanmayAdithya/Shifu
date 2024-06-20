import { IconType } from "react-icons";
export type widgetItem = {
  id: string;
  icon: IconType;
};

export type OpenWidgetsState = {
  [key: string]: boolean;
};

export type ToggleWidget = (widgetId: string) => void;

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
