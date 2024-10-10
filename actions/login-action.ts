"use server";

import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";

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
    return { error: "Password should be longer than 6 characters" };
  }

  const existingUser = await UserCollection.findOne({ username });

  if (!existingUser) {
    return { error: "Account does not exist." };
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

  return { success: true };
}
