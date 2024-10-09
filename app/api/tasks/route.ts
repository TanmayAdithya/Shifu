import { NextRequest, NextResponse } from "next/server";
import { TasksCollection } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user } = await validateRequest();

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

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }

    const user_id = user?.id;
    const body = await request.json();
    const { content, urgent, important, status } = body;

    const newTask = { user_id, content, urgent, important, status };
    const result = await TasksCollection.insertOne(newTask as any);

    return NextResponse.json(
      { ...newTask, _id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }

    const user_id = user?.id;
    const body = await request.json();
    const { _id, updates } = body;

    if (!_id || typeof _id !== "string" || !ObjectId.isValid(_id)) {
      return NextResponse.json({ message: "Invalid task ID" }, { status: 400 });
    }

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { message: "Invalid updates object" },
        { status: 400 },
      );
    }

    const result = await TasksCollection.updateOne(
      { _id: ObjectId.createFromHexString(_id) as any, user_id },
      { $set: updates },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No task found with that ID." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Task updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }
    const user_id = user?.id;
    const body = await request.json();
    const { _id } = body;
    const result = await TasksCollection.deleteOne({
      user_id,
      _id: ObjectId.createFromHexString(_id) as any,
    });
    if (!result.deletedCount) {
      return NextResponse.json(
        { message: "Deletion unsuccessful" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting task: ", error);
    return NextResponse.json(
      { message: "Error deleting task" },
      { status: 500 },
    );
  }
}
