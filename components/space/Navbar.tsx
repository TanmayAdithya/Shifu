import { navbarItems } from "@/constants/constants";
import React, { useState } from "react";
import { AiOutlinePicture as Picture } from "react-icons/ai";
import { MdOutlineLibraryMusic as Music } from "react-icons/md";
import BackgroundChanger from "./BackgroundChanger";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [openChanger, setOpenChanger] = useState<boolean>(false);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);
    setOpenChanger(id === 7 ? (prev) => !prev : false);
  };

  return (
    <>
      <BackgroundChanger openChanger={openChanger} />
      <nav className="absolute z-40 mb-[3rem] flex items-center">
        <div className="mr-2 rounded-xl bg-neutral-50 px-1 py-1">
          <TooltipProvider delayDuration={75} skipDelayDuration={75}>
            <Tooltip>
              <TooltipTrigger>
                <li
                  key="background-changer" // Unique key
                  id="background-changer"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeItem === 7 ? "bg-gray-200 hover:bg-gray-200" : ""}`}
                  onClick={() => {
                    handleClick(7);
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
            {navbarItems.map(({ id, icon: Icon, title }) => {
              const isActive = id === activeItem;
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
                        className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-200 ${isActive ? "rounded-lg bg-gray-200 hover:bg-gray-200" : ""}`}
                        onClick={() => {
                          handleClick(id);
                        }}
                      >
                        <span>
                          <Icon size={"1.35rem"} color="#262626" />
                        </span>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{title}</p>
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
                  key="music-player" // Unique key
                  id="music-player"
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeItem === 8 ? "bg-gray-200 hover:bg-gray-200" : ""}`}
                  onClick={() => {
                    handleClick(8);
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
    </>
  );
};

export default Navbar;
