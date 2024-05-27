import { IconType } from "react-icons";
export type navbarItem = {
  id: number;
  title: string;
  href: string;
  icon: IconType;
};

export type backgrounds = {
  id: string;
  blur_hash: string;
  color: string;
  height: number;
  width: number;
};
