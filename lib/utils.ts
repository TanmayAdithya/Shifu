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
          fields:
            "items(snippet(title,description,thumbnails,resourceId/videoId))",
        },
      },
    );

    let playlistItems = [];
    const data = await response.data;
    playlistItems = data.items;

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
  return null;
}
