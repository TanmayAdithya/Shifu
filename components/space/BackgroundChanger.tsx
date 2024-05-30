"use client";

import React, { useEffect, useRef, useState } from "react";
import { background } from "@/types/types";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const backgroundImage = useRef<string>("");

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
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const tags = ["Nature", "Spring", "Summer", "Winter"];

  const handleBackground = (url: string, description: string) => {
    backgroundImage.current = url;
    const currentImage = document.querySelector(
      "#background-image",
    ) as HTMLImageElement | null;
    if (currentImage) {
      currentImage.src = `${backgroundImage.current}&w=1920&h=1080&fit=crop`;
      currentImage.alt = `${description}`;
    }
  };

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
              className="rounded-lg border border-emerald-600 px-3 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:bg-emerald-600 hover:text-neutral-100 focus:bg-emerald-600 focus:text-neutral-100"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2">
        {backgrounds.map(({ id, urls, description }) => {
          return (
            <div key={id} className="shadow-lg">
              <Image
                key={id}
                alt={description}
                src={`${urls.full}&w=1920&h=1080&fit=crop`}
                width="320"
                height="180"
                style={{
                  border: 0,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleBackground(urls.full, description)}
                className={`h-full w-full object-cover`}
              />
            </div>
          );
        })}
        <div />
      </div>
    </div>
  );
}

export default BackgroundChanger;
