import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${apiKey}`,
    );

    const data = response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unsplash error: ", error);
    return NextResponse.json(
      { message: "Failed to fetch Unsplash images" },
      { status: 500 },
    );
  }
}
