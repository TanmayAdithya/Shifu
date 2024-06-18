"use client";

import { ReduxProvider } from "@/store/Provider";
import Navbar from "../../components/space/Navbar";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-end">
        <ReduxProvider>{children}</ReduxProvider>
        <Navbar />
      </div>
    </>
  );
}
