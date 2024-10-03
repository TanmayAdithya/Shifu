import {
  BackgroundDoc,
  NotesDoc,
  SessionDoc,
  TasksDoc,
  UserDoc,
} from "@/types/types";
import { Collection, MongoClient } from "mongodb";

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
export const NotesCollection = db.collection("notes") as Collection<NotesDoc>;
export const BackgroundsCollection = db.collection(
  "backgrounds",
) as Collection<BackgroundDoc>;
export const TasksCollection = db.collection("tasks") as Collection<TasksDoc>;
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
