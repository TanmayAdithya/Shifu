"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutGuest() {
  cookies().delete("guest-session");
  return redirect("/");
}
