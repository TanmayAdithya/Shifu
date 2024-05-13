import React from "react";
import SideBarButton from "../buttons/SideBarButton";
import { sidebarButtons } from "@/app/constants";

function SideBar() {
  return (
    <div className="absolute z-10 flex h-screen w-[70px] flex-col justify-evenly  bg-slate-300">
      {sidebarButtons.map(({ title, id }) => (
        <SideBarButton key={id} title={title}></SideBarButton>
      ))}
    </div>
  );
}

export default SideBar;
