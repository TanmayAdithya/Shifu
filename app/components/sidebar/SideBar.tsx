import React from "react";
import { sidebarItems } from "@/app/constants";
import { sidebarItem } from "@/app/types";
import Link from "next/link";

function SideBar() {
  return (
    <aside className="flex h-screen w-[70px] justify-center bg-slate-300 py-16">
      <ul className="flex flex-col items-center justify-evenly ">
        {sidebarItems.map(({ id, title, href, icon: Icon }: sidebarItem) => {
          return (
            <li key={id}>
              <Link href={href}>
                <span>{<Icon />}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default SideBar;
