import { auth } from "@/auth";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

export default auth((req) => {
  // req.auth
});

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
