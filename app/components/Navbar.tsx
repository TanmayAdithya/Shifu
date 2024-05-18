import { sidebarItems } from "@/app/constants";
import React, { useState } from "react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);
  };
  return (
    <nav className="absolute z-40 mb-[3rem] flex w-[24rem] items-center justify-center rounded-xl border-0 bg-neutral-50 px-1 py-1 shadow-lg">
      <div className="flex flex-1 justify-between">
        {sidebarItems.map(({ id, icon: Icon }) => {
          const isActive = id === activeItem;
          return (
            <li
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-slate-100 ${isActive ? " bg-slate-200" : ""}`}
              onClick={() => {
                handleClick(id);
              }}
            >
              <span>{<Icon size={"1.35rem"} color="#262626" />}</span>
            </li>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
