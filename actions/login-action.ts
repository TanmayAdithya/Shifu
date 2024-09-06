"use server";

import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");

  if (typeof username !== "string") {
    return { error: "Invalid username" };
  }

  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return { error: "Invalid password" };
  }

  const existingUser = await UserCollection.findOne({ username });

  if (!existingUser) {
    return { error: "Invalid username or password" };
  }

  const validPassword = await verify(existingUser.hashed_password, password, {
    memoryCost: 19485,
    timeCost: 2,
  });

  if (!validPassword) {
    return { error: "Invalid username or password" };
  }

  const session = await lucia.createSession(existingUser._id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/space");
}
