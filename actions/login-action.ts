"use server";

export async function loginAction(formData: FormData) {
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
}
