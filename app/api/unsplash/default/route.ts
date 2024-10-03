import { NextResponse } from "next/server";
import axios from "axios";
import defaultBackgrounds from "@/json/defaultBackgrounds.json";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${apiKey}`,
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching default backgrounds:", error);

    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return NextResponse.json(defaultBackgrounds, { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to fetch default backgrounds" },
      { status: 500 },
    );
  }
}
