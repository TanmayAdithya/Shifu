import SpaceBackground from "@/components/space/SpaceBackground";
import UtilityBar from "@/components/space/UtilityBar";
import { cookies } from "next/headers";
import React from "react";

const page = () => {
  const guestSessionCookie = cookies().get("guest-session");
  const guestSession = guestSessionCookie
    ? JSON.parse(guestSessionCookie.value)
    : { username: "Guest", email: "guest@anonymous.com" };

  const isGuest = !!guestSession;

  return (
    <div className="h-full w-full bg-neutral-900">
      <SpaceBackground />
      <UtilityBar
        fallback={["Guest"]}
        username={guestSession.username}
        email={guestSession.email}
        isGuest={isGuest}
      />
    </div>
  );
};

export default page;
