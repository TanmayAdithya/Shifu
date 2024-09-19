import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getChannelUploads(channelID: string, API_KEY: string) {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: "contentDetails",
          key: API_KEY,
          id: channelID,
          fields: "items/contentDetails/relatedPlaylists/uploads",
        },
      },
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }

  return null;
}

export async function getUploadPlaylistItems(
  API_KEY: string,
  playlistID: string,
) {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: "snippet",
          key: API_KEY,
          playlistId: playlistID,
          maxResults: 50,
          fields:
            "items(snippet(channelId,title,description,thumbnails,resourceId/videoId))",
        },
      },
    );

    const data = await response.data;

    return data.items;
  } catch (error) {
    console.log("Error: ", error);
  }
  return null;
}
