import React, { useState } from "react";
import { sidebarItems } from "@/app/constants";
import Link from "next/link";
import { sidebarItem } from "@/app/types";

function SidebarItem({ id, title, href, icon: Icon }: sidebarItem) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <li
      key={id}
      className={`mb-4 rounded-md border-0 bg-slate-500 p-3 hover:bg-red-500 ${active ? "bg-black" : ""}`}
      onClick={() => setActive((prev) => !prev)}
    >
      <Link href={href}>
        <span>{<Icon size={"1.6rem"} color="white" />}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
