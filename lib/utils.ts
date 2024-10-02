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

export const randomPosition = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getQuadrantPosition = (
  urgent: boolean | undefined,
  important: boolean | undefined,
) => {
  let xRange, yRange;

  const isUrgent = urgent ?? false;
  const isImportant = important ?? false;

  const margin = 10;

  if (isImportant && isUrgent) {
    xRange = [margin, 50 - margin];
    yRange = [margin, 50 - margin];
  } else if (isImportant && !isUrgent) {
    xRange = [50 + margin, 100 - margin];
    yRange = [margin, 50 - margin];
  } else if (!isImportant && isUrgent) {
    xRange = [margin, 50 - margin];
    yRange = [50 + margin, 100 - margin];
  } else {
    xRange = [50 + margin, 100 - margin];
    yRange = [50 + margin, 100 - margin];
  }

  return {
    x: randomPosition(xRange[0], xRange[1]),
    y: randomPosition(yRange[0], yRange[1]),
  };
};
