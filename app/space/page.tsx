import React from "react";
import SideBar from "../components/sidebar/SideBar";

export default function page() {
  return (
    <>
      <div className="flex">
        <SideBar />
        {/* Background */}
        <div className="h-screen w-screen bg-red-900">
          <h1>yo</h1>
        </div>
      </div>
    </>
  );
}
