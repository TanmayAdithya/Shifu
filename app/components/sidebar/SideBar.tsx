import React from "react";
import SideBarButton from "../buttons/SideBarButton";
import { sidebarButtons } from "@/app/constants";

function SideBar() {
  return (
    <aside className="flex h-screen w-[70px]  bg-slate-300">
      <ul className="flex flex-col items-center justify-evenly pb-44 ">
        {sidebarButtons.map(({ title, id }) => (
          <SideBarButton key={id} title={title}></SideBarButton>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
