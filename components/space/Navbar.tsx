"use client";

import { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toggleWidget } from "@/store/slices/widgetSlice";
import { FaMinus as MinimizeIcon } from "react-icons/fa6";
import { RootState } from "@/store/rootReducer";

type Props = {
  openWidgets: WidgetState[];
};

const Navbar = ({ openWidgets }: Props) => {
  const [openChanger, setOpenChanger] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeRef = useRef<number>(Date.now());

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (Date.now() - interactionTimeRef.current >= 3000) {
        setIsVisible(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleInteraction = () => {
      setIsVisible(true);
      interactionTimeRef.current = Date.now();
      resetTimer();
    };

    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("wheel", handleInteraction);
    document.addEventListener("click", handleInteraction);
    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("wheel", handleInteraction);
      document.removeEventListener("click", handleInteraction);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  return (
    <div
      className={`fixed bottom-20 left-0 right-0 flex justify-center`}
      style={{ zIndex: 1000 }}
    >
      {/* Background Changer Container */}
      <div
        className={`${
          openChanger ? "" : "hidden"
        } ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} absolute bottom-2 z-20 h-[20rem] w-[28rem] overflow-hidden rounded-xl bg-neutral-50 p-4 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
      >
        <BackgroundChanger />
        <div className="absolute right-2 top-[2px]">
          <button
            onClick={() => {
              setOpenChanger(false);
              setActiveItem(null);
            }}
          >
            <MinimizeIcon
              className={`cursor-pointer ${isGlassMode ? "text-neutral-100 hover:text-neutral-300 dark:text-neutral-300" : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-50"} transition-colors duration-100 hover:text-neutral-700`}
            />
          </button>
        </div>
      </div>

      <nav
        className={`${isVisible ? "opacity-100" : "opacity-0"} absolute z-40 mb-[3rem] flex transform items-center transition-opacity duration-700 ease-in-out`}
      >
        {/* Background Changer Tab */}
        <div
          className={`${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} mr-2 rounded-xl bg-neutral-50 px-1 py-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
        >
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="background-changer"
                  id="background-changer"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out dark:hover:bg-neutral-800 ${
                    activeItem === "background"
                      ? `dark:bg-neutral-800 dark:hover:bg-neutral-800 ${isGlassMode ? "bg-neutral-200 backdrop-blur hover:bg-neutral-200 dark:bg-opacity-80" : "hover:bg-neutral-200"}`
                      : ""
                  } ${isGlassMode ? "backdrop-blur hover:bg-neutral-200/30 dark:bg-opacity-80" : ""}`}
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

        <div
          className={`${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} w-[20rem] items-center justify-center rounded-xl bg-neutral-50 p-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
        >
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
                        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out dark:hover:bg-neutral-800 ${
                          openWidgets[index].visibility
                            ? "bg-neutral-200 dark:bg-neutral-800"
                            : ""
                        } ${isGlassMode ? "hover:bg-neutral-200/30" : "hover:bg-neutral-200"}`}
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
        <div
          className={` ${isGlassMode ? "bg-opacity-30 backdrop-blur dark:bg-opacity-80" : ""} ml-2 rounded-xl bg-neutral-50 px-1 py-1 shadow-md dark:border dark:border-neutral-800 dark:bg-neutral-900`}
        >
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="music-player"
                  id="music-player"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out dark:hover:bg-neutral-800 ${
                    openWidgets[6].visibility
                      ? `${isGlassMode ? "bg-neutral-300 hover:bg-neutral-200/30" : "bg-neutral-200 hover:bg-neutral-200"} dark:bg-neutral-800 dark:hover:bg-neutral-800`
                      : ""
                  } ${isGlassMode ? "hover:bg-neutral-200/30" : "hover:bg-neutral-200"} `}
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
