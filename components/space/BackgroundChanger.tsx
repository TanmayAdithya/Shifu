"use client";

import React, { useEffect, useRef, useState } from "react";
import { background } from "@/types/types";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(9);
  const [page, setPage] = useState<number>(7);
  const backgroundImage = useRef<string>("");
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    // const fetchData = async () => {
    //   try {
    //     const res = await fetch(
    //       `https://api.unsplash.com/search/photos?page=${page}&query=${debouncedSearch}&client_id=${apiKey}`,
    //       { signal },
    //     );
    //     if (!res.ok) {
    //       throw new Error("Something went wrong!");
    //     }
    // const data = await res.json()
    //     const backgrounds = data.results;
    // const pages = data.total_pages;
    //     console.log(backgrounds);
    //     setBackgrounds(backgrounds);
    // setPages(backgrounds)
    //     setLoading(false);
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       if (error.name === "AbortError") {
    //         console.log("Fetch aborted");
    //       } else {
    //         setError(error.message);
    //       }
    //     } else {
    //       setError("An unknown error occurred");
    //     }
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    // return () => {
    //   controller.abort();
    // };
  }, [debouncedSearch]);

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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Tags */}
        <div className=" mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-lg border border-emerald-600 px-3 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:bg-emerald-600 hover:text-neutral-100 focus:bg-emerald-600 focus:text-neutral-100"
              onClick={() => setSearch(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2">
        {loading && <p>Loading...</p>}
        {error && <p>Error...</p>}
        {backgrounds.map(({ id, urls, description }) => {
          return (
            <div key={id} className="rounded shadow-lg">
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
      <div className="mt-8 flex items-center justify-evenly">
        {page > 1 && (
          <button
            onClick={() => setPage((page) => page - 1)}
            className="rounded-lg bg-emerald-300 px-3 py-1"
          >
            Prev
          </button>
        )}
        <p>{page}</p>
        {page < totalPages && (
          <button
            onClick={() => setPage((page) => page + 1)}
            className="rounded-lg bg-emerald-300 px-3 py-1"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default BackgroundChanger;
