import { NextResponse } from "next/server";
import { NotesCollection } from "@/lib/db";
import { validateRequest } from "@/lib/auth";

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
