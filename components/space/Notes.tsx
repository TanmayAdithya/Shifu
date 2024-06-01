import React from "react";

import { TbLayoutSidebar as SidebarIcon } from "react-icons/tb";
import { IoIosSearch as Search } from "react-icons/io";
import { FiEdit as NewNote } from "react-icons/fi";

type Props = {};

export default function Notes({}: Props) {
  return (
    <div className="absolute left-56 top-20 flex h-[36rem] min-w-[192px] rounded-lg bg-white shadow-lg">
      <aside className="overflow-auto rounded-lg">
        <div>
          <div className="sticky top-0 bg-white p-2">
            {/* Sidebar */}
            <span>
              <SidebarIcon
                color="#737373"
                size={"24px"}
                className="mb-2 cursor-pointer"
              />
            </span>
            {/* Search Box */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center rounded-md border-2 border-neutral-400 pl-1">
                <Search size={"20px"} className="mr-1 fill-neutral-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[144px] bg-transparent text-lg text-neutral-700 outline-none placeholder:text-neutral-400 focus:placeholder:text-transparent active:border-0"
                />
              </div>
              <div className=" h-full w-full flex-1 flex-grow cursor-pointer rounded-md bg-neutral-500 p-2 transition-colors duration-100 hover:bg-neutral-700">
                <NewNote size={"16px"} color="#fff" />
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="mt-2 flex flex-col gap-2 px-2 pb-2">
            {Array.from({ length: 28 }).map((_, index) => (
              <div
                key={index}
                className="w-full cursor-pointer list-none rounded-lg bg-neutral-600 p-2 text-white transition-colors duration-100 hover:bg-neutral-700"
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <div className="w-[30rem] rounded-e-lg bg-neutral-100 p-2"></div>
    </div>
  );
}
