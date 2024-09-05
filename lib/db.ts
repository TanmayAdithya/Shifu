import { Collection, MongoClient } from "mongodb";

interface UserDoc {
  _id: string;
  username: string;
  hashed_password: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();

const db = client.db("ShifuDB");
export const UserCollection = db.collection("users") as Collection<UserDoc>;
export const SessionCollection = db.collection(
  "sessions",
) as Collection<SessionDoc>;
