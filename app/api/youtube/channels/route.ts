import { getChannelUploads, getUploadPlaylistItems } from "@/lib/utils";
import { ChannelIdResponse } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    throw new Error("Something went wrong with the .env");
  }

  const channelIds: string[] = [
    "UCqRTj-Nu_8to3jIBlXptOtA", // Ambience
    "UCwaMXiEfLn3UtpC2I0E2jxQ", // Study
    "UCb57aRZr3KsykS_wNsD5Ptw", // Earth
    "UC95bEkaIgwhxSjSsdMFXYGg", // Relax
    "UCDyghjHud0sexPHxs5qPXUQ", // Scifi
    "UC84t1K5ri-7u9bFCaUKTXDA", // Cafe
  ];

  try {
    const response: ChannelIdResponse[] = await Promise.all(
      channelIds.map((channel) => getChannelUploads(channel, API_KEY)),
    );

    const playlistItems = await Promise.all(
      response.map((channelId) => {
        const items = channelId.items;
        if (items) {
          const playlistId =
            items[0]?.contentDetails?.relatedPlaylists?.uploads;
          if (playlistId) {
            return getUploadPlaylistItems(API_KEY, playlistId);
          }
        }
      }),
    );

    return NextResponse.json(playlistItems, { status: 200 });
  } catch (error) {
    console.error("YouTube API error: ", error);
    return NextResponse.json(
      { message: "Failed to fetch channel content" },
      { status: 500 },
    );
  }
}
