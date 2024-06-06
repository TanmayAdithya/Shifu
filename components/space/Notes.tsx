"use client";

import React, { useState } from "react";

import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";
import Tiptap from "./Tiptap";

type Props = {};

export default function Notes({}: Props) {
  const [openNote, setOpenNote] = useState<boolean>(true);

  return (
    <div className="absolute left-56 top-20 flex h-[30rem] min-w-[192px] rounded-xl bg-white shadow-lg">
      <aside className="min-w-[14.5rem] overflow-auto rounded-l-xl border-r border-r-neutral-200 bg-[#F7F7F7]">
        <div>
          <div className="sticky top-0 bg-[#F7F7F7] px-3 pb-2 pt-3">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className="mb-2 cursor-pointer"
                onClick={() => setOpenNote((prev) => !prev)}
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center rounded-md border border-[#E8E8E8] bg-white pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search notes"
                  className="w-[144px] rounded-r-md bg-white p-1 text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                />
              </div>
              <div className="h-full w-full flex-1 flex-grow cursor-pointer rounded-md bg-[#8F8F8F] p-2 transition-colors duration-100 hover:bg-neutral-700">
                <NewNote size={"17px"} color="#fff" />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="flex flex-col gap-2 px-3 pb-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-full cursor-pointer list-none rounded-lg border border-[#E8E8E8] bg-white p-2 transition-colors duration-100 hover:bg-neutral-200"
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className="w-[30rem] overflow-auto rounded-e-xl bg-white p-2">
        <Tiptap />
      </div>
    </div>
  );
}
