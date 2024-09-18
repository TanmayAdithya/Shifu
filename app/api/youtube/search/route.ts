import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    throw new Error("Something went wrong with the .env");
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  const BASE_URL = `https://youtube.googleapis.com/youtube/v3/search`;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        part: "snippet",
        key: API_KEY,
        maxResults: "9",
        type: "video",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("YouTube API error: ", error);
    return NextResponse.json(
      { message: "Failed to fetch videos" },
      { status: 500 },
    );
  }
}
