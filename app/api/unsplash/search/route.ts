import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        page: page,
        client_id: apiKey,
      },
    });

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
