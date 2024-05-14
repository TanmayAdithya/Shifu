"use client";

import { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import { RiArrowLeftWideFill as LArrow } from "react-icons/ri";
import { RiArrowRightWideFill as RArrow } from "react-icons/ri";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [moveSidebar, setMoveSidebar] = useState<boolean>(false);

  return (
    <section className="flex flex-1">
      <SideBar />
      <div className="relative flex h-screen flex-col overflow-hidden">
        <div className="fixed left-20 top-1/2 z-40">
          <button onClick={() => setMoveSidebar((prev) => !prev)}>
            <span>
              {moveSidebar ? (
                <RArrow size="1.5rem" color="white" />
              ) : (
                <LArrow size="1.5rem" color="white" />
              )}
            </span>
          </button>
        </div>
      </div>
      {children}
    </section>
  );
}
