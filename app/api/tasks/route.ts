import { NextResponse } from "next/server";
import { TasksCollection } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import guestTasks from "@/json/guestTasks.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      const guestSession = cookies().get("guest-session");

      if (!guestSession) {
        return NextResponse.json(
          { message: "401 Unauthorized" },
          { status: 401 },
        );
      }

      return NextResponse.json(guestTasks, { status: 200 });
    }

    const user_id = user?.id;

    const tasks = await TasksCollection.find({ user_id }).toArray();
    // return NextResponse.json(tasks, { status: 200 });
    return NextResponse.json(guestTasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 },
    );
  }
}
