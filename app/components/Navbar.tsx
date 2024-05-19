import { navbarItems } from "@/app/constants";
import React, { useState } from "react";
import { AiOutlinePicture as Picture } from "react-icons/ai";
import { MdOutlineLibraryMusic as Music } from "react-icons/md";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);

    // Change background
    const bgChanger = document.getElementById("background-changer");
    if (id === 7) {
      if (bgChanger) {
        bgChanger.classList.add("bg-slate-200", "hover:bg-slate-200");
      }
    } else {
      bgChanger?.classList.remove("bg-slate-200", "hover:bg-slate-200");
    }
    //Music Player
    const musicPlayer = document.getElementById("music-player");
    if (id === 8) {
      if (musicPlayer) {
        musicPlayer.classList.add("bg-slate-200", "hover:bg-slate-200");
      }
    } else {
      musicPlayer?.classList.remove("bg-slate-200", "hover:bg-slate-200");
    }
  };

  return (
    <div className="absolute z-40 mb-[3rem] flex items-center">
      <div className="mr-2 rounded-xl bg-slate-50 px-1 py-1">
        <li
          id="background-changer"
          key={7}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ease-in-out hover:bg-slate-100"
          onClick={() => {
            handleClick(8);
          }}
        >
          <span>{<Picture size={"1.35rem"} color="#262626" />}</span>
        </li>
      </div>
      <div className="w-[24rem] items-center justify-center rounded-xl border-0 bg-neutral-50 px-1 py-1 shadow-lg">
        <div className="flex flex-1 justify-between">
          {navbarItems.map(({ id, icon: Icon }) => {
            const isActive = id === activeItem;
            return (
              <li
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-slate-100 ${isActive ? " bg-slate-200 hover:bg-slate-200" : ""}`}
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
      <div className="ml-2 rounded-xl bg-slate-50 px-1 py-1">
        <li
          id="music-player"
          key={8}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ease-in-out hover:bg-slate-100"
          onClick={() => {
            handleClick(8);
          }}
        >
          <span>{<Music size={"1.35rem"} color="#262626" />}</span>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
