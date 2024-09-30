import { NextRequest, NextResponse } from "next/server";
import { NotesCollection } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error("401 Unauthorized");
    }

    const user_id = user?.id;
    const notes = await NotesCollection.find({ user_id }).toArray();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { message: "Error fetching notes" },
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
    const { content, title } = body;

    const newNote = { user_id, content, title };
    const result = await NotesCollection.insertOne(newNote as any);

    return NextResponse.json(
      { ...newNote, _id: result.insertedId },
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

    const body = await request.json();
    const { _id, updates } = body;

    const result = await NotesCollection.updateOne(
      { _id: ObjectId.createFromHexString(_id) as any },
      { $set: updates },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No note found with that ID." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { message: "Error updating note" },
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
    const result = await NotesCollection.deleteOne({
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
    console.error("Error deleting note: ", error);
    return NextResponse.json(
      { message: "Error deleting note" },
      { status: 500 },
    );
  }
}
