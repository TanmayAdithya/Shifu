import { navbarItems } from "@/constants/constants";
import React, { useState } from "react";
import { AiOutlinePicture as Picture } from "react-icons/ai";
import { MdOutlineLibraryMusic as Music } from "react-icons/md";
import BackgroundChanger from "./BackgroundChanger";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [openChanger, setOpenChanger] = useState<boolean>(false);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);
    setOpenChanger(id === 7 ? (prev) => !prev : false);
  };

  return (
    <>
      {openChanger && <BackgroundChanger />}
      <nav className="absolute z-40 mb-[3rem] flex items-center">
        <div className="mr-2 rounded-xl bg-neutral-50 px-1 py-1">
          <li
            key={7}
            id="background-changer"
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out  hover:bg-emerald-100 ${activeItem === 7 ? "bg-emerald-200 hover:bg-emerald-200" : ""} `}
            onClick={() => {
              handleClick(7);
            }}
          >
            <span>{<Picture size={"1.35rem"} color="#262626" />}</span>
          </li>
        </div>
        <div className="w-[20rem] items-center justify-center rounded-xl border-0 bg-neutral-50 px-1 py-1 shadow-lg">
          <div className="flex flex-1 justify-between">
            {navbarItems.map(({ id, icon: Icon }) => {
              const isActive = id === activeItem;
              return (
                <li
                  key={id}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-emerald-100 ${isActive ? " rounded-lg bg-emerald-200 hover:bg-emerald-200" : ""}`}
                  onClick={() => {
                    handleClick(id);
                  }}
                >
                  <span>{<Icon size={"1.35rem"} color="#262626" />}</span>
                </li>
              );
            })}
          </div>
        </div>
        <div className="ml-2 rounded-xl bg-neutral-50 px-1 py-1">
          <li
            id="music-player"
            key={8}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-100 ease-in-out hover:bg-emerald-100 ${activeItem === 8 ? "bg-emerald-200 hover:bg-emerald-200" : ""} `}
            onClick={() => {
              handleClick(8);
            }}
          >
            <span>{<Music size={"1.35rem"} color="#262626" />}</span>
          </li>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
