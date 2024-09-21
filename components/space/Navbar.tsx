"use client";

import { useState } from "react";
import { widgetItems } from "@/constants/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WidgetState } from "@/types/types";
import BackgroundChanger from "./BackgroundChanger";
import { AiOutlinePicture as Picture } from "react-icons/ai";
import { MdOutlineLibraryMusic as Music } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleWidget } from "@/store/slices/widgetSlice";
import { FaMinus as MinimizeIcon } from "react-icons/fa6";

type Props = {
  openWidgets: WidgetState[];
};

const Navbar = ({ openWidgets }: Props) => {
  const [openChanger, setOpenChanger] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleClick = (id: string) => {
    if (id === "background") {
      setOpenChanger((prev) => !prev);
    } else if (id === "music") {
      dispatch(toggleWidget("Music"));
    }
    setActiveItem(id === activeItem ? null : id);
  };

  const handleToggleWidget = (widgetId: string) => {
    dispatch(toggleWidget(widgetId));
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center">
      {/* Background Changer Container */}
      <div
        className={`${
          openChanger ? "" : "hidden"
        } absolute bottom-2 z-20 h-[20rem] w-[28rem] overflow-hidden rounded-xl bg-neutral-50 p-4 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
      >
        <BackgroundChanger />
        <div className="absolute right-2 top-[2px]">
          <button
            onClick={() => {
              setOpenChanger(false);
              setActiveItem(null);
            }}
          >
            <MinimizeIcon className="cursor-pointer text-neutral-400 transition-colors duration-100 hover:text-neutral-700" />
          </button>
        </div>
      </div>

      <nav className="absolute z-40 mb-[3rem] flex items-center">
        {/* Background Changer Tab */}
        <div className="mr-2 rounded-xl bg-neutral-50 px-1 py-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900">
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="background-changer"
                  id="background-changer"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
                    activeItem === "background"
                      ? "bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800"
                      : ""
                  }`}
                  onClick={() => {
                    handleClick("background");
                  }}
                >
                  <span>
                    <Picture
                      size={"1.35rem"}
                      className="text-neutral-900 dark:text-neutral-50"
                    />
                  </span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                <p>Background</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="w-[20rem] items-center justify-center rounded-xl bg-neutral-50 p-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-1 justify-between">
            {widgetItems.map(({ id, icon: Icon }, index) => {
              return (
                <TooltipProvider
                  key={id}
                  delayDuration={75}
                  skipDelayDuration={75}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <li
                        key={id}
                        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
                          openWidgets[index].visibility
                            ? "bg-neutral-200 dark:bg-neutral-800"
                            : ""
                        }`}
                        onClick={() => handleToggleWidget(id)}
                      >
                        <span>
                          <Icon
                            size={"1.35rem"}
                            className="dark:text-neutral-50"
                          />
                        </span>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{id}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>

        {/* Music Player Tab */}
        <div className="ml-2 rounded-xl bg-neutral-50 px-1 py-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900">
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="music-player"
                  id="music-player"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
                    openWidgets[6].visibility
                      ? "bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800"
                      : ""
                  }`}
                  onClick={() => {
                    handleClick("music");
                  }}
                >
                  <span>
                    <Music
                      size={"1.35rem"}
                      className="text-neutral-900 dark:text-neutral-50"
                    />
                  </span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                <p>Music</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
