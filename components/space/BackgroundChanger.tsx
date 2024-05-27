"use client";

import React, { useEffect, useState } from "react";
import { backgrounds } from "@/types/types";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<backgrounds[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/?client_id=${apiKey}`,
          { signal },
        );

        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const backgrounds = await res.json();
        console.log(backgrounds);
        setBackgrounds(backgrounds);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setError(error.message);
          }
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    // fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const tags = ["Nature", "Spring", "Summer", "Winter"];
  const imageItems = [
    {
      id: 1,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Nature Image 1",
    },
    {
      id: 2,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Nature Image 2",
    },
    {
      id: 3,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Spring Image 1",
    },
    {
      id: 4,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Summer Image 1",
    },
    {
      id: 5,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Winter Image 1",
    },
    {
      id: 6,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Winter Image 1",
    },
    {
      id: 7,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Winter Image 1",
    },
    {
      id: 8,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Winter Image 1",
    },
    {
      id: 9,
      url: "https://via.placeholder.com/1920x1080",
      alt: "Winter Image 1",
    },
    // Add more images as needed
  ];

  return (
    <div className="absolute z-40 mb-28 h-[20rem] w-[28rem] overflow-hidden overflow-y-scroll rounded-xl bg-neutral-50 p-4 shadow-lg">
      <div>
        <div className=" mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        {/* Tags */}
        <div className=" mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-lg bg-emerald-800 px-3 py-1 text-sm text-neutral-100"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 ">
        {imageItems.map((image) => (
          <div key={image.id} className="rounded-md bg-gray-100">
            <img
              src={image.url}
              alt={image.alt}
              className="h-auto w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackgroundChanger;
