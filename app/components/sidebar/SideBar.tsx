"use client";
import { sidebarItems } from "@/app/constants";
import Link from "next/link";
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
      <nav className="flex h-full w-[80px] flex-col items-center bg-neutral-800 pt-4  backdrop:blur-sm">
        <div>
          <img
            src="/shifu-320-trans.webp"
            alt="shifu-logo"
            style={{ width: "48px", marginBottom: "1.5rem" }}
          />
        </div>
        <div className="mb-6 w-14 border-t border-neutral-600"></div>
        <ul className="flex flex-col items-center">
          {sidebarItems.map(({ id, title, href, icon: Icon }) => {
            const isActive = id === activeItem;
            return (
              <Link key={id} href={href}>
                <li
                  className={`mb-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-neutral-600 transition-colors duration-200 ease-in-out hover:border-red-700 hover:bg-red-800 ${isActive ? "border-red-700 bg-red-800" : ""}`}
                  onClick={() => {
                    handleClick(id);
                  }}
                >
                  <span>{<Icon size={"1.5rem"} color="white" />}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
