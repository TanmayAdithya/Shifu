"use server";

import { cookies } from "next/headers";

const GUEST_SESSION_ID = "guest-session";

export async function guestAuthAction() {
  const guestUserId = "guest-" + Math.random().toString(36).substring(2, 15);

  const guestSession = {
    userId: guestUserId,
    username: "Guest",
    email: "guest@anonymous.com",
  };

  const isProduction = process.env.NODE_ENV === "production";

  cookies().set(GUEST_SESSION_ID, JSON.stringify(guestSession), {
    path: "/",
    httpOnly: false,
    sameSite: "none",
    secure: isProduction,
    maxAge: 60 * 60,
  });

  return { success: true, guestSession };
}
