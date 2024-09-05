import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { UserCollection, SessionCollection } from "./db";

const adapter = new MongodbAdapter(
  SessionCollection as any,
  UserCollection as any,
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    const userAttributes = attributes as { username: string };
    return {
      username: userAttributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}