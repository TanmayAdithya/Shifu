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

type Props = {
  openWidgets: WidgetState;
};

const Navbar = ({ openWidgets }: Props) => {
  const [openChanger, setOpenChanger] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleClick = (id: string) => {
    setActiveItem(id === activeItem ? null : id);
    setOpenChanger(id === "background" ? (prev) => !prev : false);
  };

  const handleToggleWidget = (widgetId: string) => {
    dispatch(toggleWidget(widgetId));
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center">
      <BackgroundChanger openChanger={openChanger} />
      <nav className="absolute z-40 mb-[3rem] flex items-center">
        <div className="mr-2 rounded-xl bg-neutral-50 px-1 py-1">
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="background-changer"
                  id="background-changer"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-neutral-200 ${activeItem === "background" ? "bg-neutral-200 hover:bg-neutral-200" : ""}`}
                  onClick={() => {
                    handleClick("background");
                  }}
                >
                  <span>
                    <Picture size={"1.35rem"} color="#262626" />
                  </span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                <p>Background</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-[20rem] items-center justify-center rounded-xl border-0 bg-neutral-50 px-1 py-1 shadow-lg">
          <div className="flex flex-1 justify-between">
            {widgetItems.map(({ id, icon: Icon }) => {
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
                        className={`4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-neutral-200 ${openWidgets[id] ? "bg-neutral-200" : ""}`}
                        onClick={() => handleToggleWidget(id)}
                      >
                        <span>
                          <Icon size={"1.35rem"} color="#262626" />
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
        <div className="ml-2 rounded-xl bg-neutral-50 px-1 py-1">
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="music-player"
                  id="music-player"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-neutral-200 ${activeItem === "music" ? "bg-neutral-200 hover:bg-neutral-200" : ""}`}
                  onClick={() => {
                    handleClick("music");
                  }}
                >
                  <span>
                    <Music size={"1.35rem"} color="#262626" />
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
