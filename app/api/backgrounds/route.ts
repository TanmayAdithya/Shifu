import { validateRequest } from "@/lib/auth";
import { BackgroundsCollection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import defaultUserBackground from "@/json/defaultUserBackground.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }

    const user_id = user?.id;

    let currentBackground = await BackgroundsCollection.findOne({ user_id });

    if (!currentBackground) {
      const defaultBackground = defaultUserBackground;

      const result = await BackgroundsCollection.insertOne({
        ...(defaultBackground as any),
        user_id,
      });

      return NextResponse.json(defaultBackground, { status: 200 });
    }

    return NextResponse.json(currentBackground, { status: 200 });
  } catch (error) {
    console.error("Error fetching background:", error);
    return NextResponse.json(
      { error: "Failed to fetch background" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    const body = await req.json();
    const { mediaRef, name, portfolio_url, active } = body;

    if (!user) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }

    const user_id = user.id;

    const result = await BackgroundsCollection.updateOne(
      { user_id },
      {
        $set: {
          mediaRef,
          name,
          portfolio_url,
          active,
          user_id,
        },
      },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No background found with that ID." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Background updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving background:", error);
    return NextResponse.json(
      { error: "Failed to save background" },
      { status: 500 },
    );
  }
}
