import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("page");

  if (!query || !page) {
    return NextResponse.json(
      { error: "Query and page parameters are required" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query,
        page,
        client_id: apiKey,
      },
    });
    return NextResponse.json(
      {
        backgrounds: response.data.results,
        totalPages: response.data.total_pages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching search backgrounds:", error);
    return NextResponse.json(
      { error: "Failed to fetch search backgrounds" },
      { status: 500 },
    );
  }
}
