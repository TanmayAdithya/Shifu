"use client";

import React, { useEffect, useState } from "react";
import { background } from "@/types/types";
import Image from "next/image";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
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

    // return () => {
    //   controller.abort();
    // };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const tags = ["Nature", "Spring", "Summer", "Winter"];

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
      <div className="grid grid-cols-3 gap-4">
        {backgrounds.map(({ id, urls, description }) => (
          <Image
            key={id}
            alt={description}
            src={urls.regular}
            width="80"
            height="45"
            style={{ objectFit: "cover" }}
          />
        ))}
        <div />
      </div>
    </div>
  );
}

export default BackgroundChanger;
