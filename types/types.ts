import { IconType } from "react-icons";
export type navbarItem = {
  id: number;
  title: string;
  href: string;
  icon: IconType;
};

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
}

export interface TodosState {
  todos: Todo[];
}
