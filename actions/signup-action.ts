"use server";

import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export async function signupAction(formData: FormData) {
  const username = formData.get("username");

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return { error: "Invalid username" };
  }

  const email = formData.get("email");

  if (typeof email !== "string") {
    return { error: "Invalid email" };
  }

  const password = formData.get("password");

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return { error: "Invalid password" };
  }

  const existingUser = await UserCollection.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return { error: "Username or email already taken" };
  }

  const hashedPassword = await hash(password, {
    memoryCost: 19485,
    timeCost: 2,
  });

  const userId = generateIdFromEntropySize(10);

  await UserCollection.insertOne({
    user_id: userId,
    username: username,
    email: email,
    hashed_password: hashedPassword,
  });

  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { success: true };
}
