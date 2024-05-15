"use client";
import { sidebarItems } from "@/app/constants";
import { RiArrowLeftWideFill as LArrow } from "react-icons/ri";
import { RiArrowRightWideFill as RArrow } from "react-icons/ri";
// import Link from "next/link";
import { useState } from "react";

type Props = {
  visibility: boolean;
};

function SideBar({ visibility }: Props) {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveItem(id === activeItem ? null : id);
  };
  return (
    <aside
      className={`flex h-screen items-center justify-center shadow-md ${visibility ? "hidden" : ""}`}
    >
      <nav className="flex h-full w-[80px] flex-col items-center bg-neutral-900 py-6  backdrop:blur-sm">
        <div>
          <img
            src="/shifu-320-trans.webp"
            alt="shifu-logo"
            style={{ width: "3rem", marginBottom: "1.5rem" }}
          />
        </div>
        <div className="mb-8 w-[70%] border-t border-red-900"></div>
        <ul className="flex flex-col items-center">
          {sidebarItems.map(({ id, title, href, icon: Icon }) => {
            const isActive = id === activeItem;
            return (
              <li
                key={id}
                className={`mb-6 cursor-pointer rounded-md border-0 p-3 transition-colors duration-200 ease-in-out ${isActive ? "" : "bg-gradient-to-r from-rose-500 to-red-800"}`}
                onClick={() => {
                  handleClick(id);
                }}
              >
                <span>{<Icon size={"1.6rem"} color="white" />}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
