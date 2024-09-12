import { NextResponse } from "next/server";
import { TasksCollection } from "@/lib/db";

export async function GET() {
  try {
    const tasks = await TasksCollection.find().toArray();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 },
    );
  }
}
