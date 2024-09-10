import { Collection, MongoClient } from "mongodb";

interface UserDoc {
  _id: string;
  username: string;
  email: string;
  hashed_password: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

let client: MongoClient | null = null;
let dbInstance: any = null;
if (!client) {
  client = new MongoClient(process.env.MONGODB_URI!);
  async () => {
    if (client) {
      try {
        await client.connect();
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
      }
    }
  };
}

dbInstance = client?.db("ShifuDB");
if (!dbInstance) {
  throw new Error("Failed to connect to the database.");
}
const db = dbInstance;
export const UserCollection = db.collection("users") as Collection<UserDoc>;
export const SessionCollection = db.collection(
  "sessions",
) as Collection<SessionDoc>;

process.on("SIGINT", async () => {
  try {
    if (client) {
      await client.close();
    }
  } catch (error) {
    console.error("Failed to close MongoDB connection:", error);
  }
  process.exit(0);
});
