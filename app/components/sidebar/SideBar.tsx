"use client";
import { sidebarItems } from "@/app/constants";
// import Link from "next/link";
import { useState } from "react";

function SideBar() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);
  };
  return (
    <>
      <aside className="flex h-screen w-[80px] flex-col items-center bg-neutral-900 py-6  backdrop:blur-sm">
        <img
          src="/shifu-320-trans.webp"
          alt="shifu-logo"
          style={{ width: "3rem", marginBottom: "1.5rem" }}
        />
        <div className="mb-8 w-[70%] border-[1px] border-red-900"></div>
        <ul className="flex flex-col items-center">
          {sidebarItems.map(({ id, title, href, icon: Icon }) => {
            const isActive = id === activeItem;
            return (
              <li
                key={id}
                className={`mb-4 cursor-pointer rounded-md border-0 bg-neutral-500 p-3 transition-colors duration-200 ease-in-out hover:bg-red-500 ${isActive ? "bg-rose-600" : ""}`}
                onClick={() => {
                  handleClick(id);
                }}
              >
                <span>{<Icon size={"1.6rem"} color="white" />}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default SideBar;
