import { NextResponse } from "next/server";
import { NotesCollection } from "@/lib/db";

export async function GET() {
  try {
    const notes = await NotesCollection.find().toArray();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { message: "Error fetching notes" },
      { status: 500 },
    );
  }
}
