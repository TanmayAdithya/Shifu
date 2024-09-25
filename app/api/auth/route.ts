import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("guest-session");
  const isGuest = sessionCookie ? false : true;

  return Response.json({ isGuest });
}
