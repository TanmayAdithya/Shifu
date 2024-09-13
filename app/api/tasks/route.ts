import { NextResponse } from "next/server";
import { TasksCollection } from "@/lib/db";
import { validateRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error("401 Unauthorized");
    }

    const user_id = user?.id;

    const tasks = await TasksCollection.find({ user_id }).toArray();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 },
    );
  }
}
