"use client";

import React, { useEffect, useRef, useState } from "react";
import { background } from "@/types/types";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MdKeyboardArrowRight as Next,
  MdKeyboardArrowLeft as Prev,
} from "react-icons/md";

const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const backgroundImage = useRef<string>("");
  const debouncedSearch = useDebounce(search, 1000);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   const fetchData = async () => {
  //     try {
  //       if (debouncedSearch) {
  //         const res = await fetch(
  //           `https://api.unsplash.com/search/photos?page=${page}&query=${debouncedSearch}&client_id=${apiKey}`,
  //           { signal },
  //         );
  //         if (!res.ok) {
  //           throw new Error("Something went wrong!");
  //         }
  //         const data = await res.json();
  //         const backgrounds = data.results;
  //         const pages = data.total_pages;
  //         console.log(backgrounds);
  //         setBackgrounds(backgrounds);
  //         setTotalPages(pages);
  //       } else {
  //         const res = await fetch(
  //           `https://api.unsplash.com/photos/?client_id=${apiKey}`,
  //           { signal },
  //         );
  //         if (!res.ok) {
  //           throw new Error("Something went wrong!");
  //         }
  //         const backgrounds = await res.json();
  //         console.log(backgrounds);
  //         setBackgrounds(backgrounds);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         if (error.name === "AbortError") {
  //           console.log("Fetch aborted");
  //         } else {
  //           setError(error.message);
  //         }
  //       } else {
  //         setError("An unknown error occurred");
  //       }
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     controller.abort();
  //   };
  // }, [debouncedSearch, page]);

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
    <>
      <div className="mt-4">
        <div className="mb-2 p-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-gray-300 p-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-md border border-gray-600 px-3 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:bg-gray-600 hover:text-neutral-100 focus:bg-gray-600 focus:text-neutral-100"
              onClick={() => setSearch(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-h-[11rem] w-full overflow-auto">
        <div
          className={`${
            debouncedSearch ? "" : "mb-2"
          } grid w-full grid-cols-2 gap-2 p-1`}
        >
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-[113px] w-[200px] rounded" />
            ))}
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
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        {debouncedSearch && (
          <div className="mb-4 mt-4 flex items-center justify-center gap-6">
            {page > 1 ? (
              <button
                onClick={() => setPage((page) => page - 1)}
                className="rounded-lg bg-gray-300 p-1"
              >
                <Prev />
              </button>
            ) : (
              <button
                disabled
                onClick={() => setPage((page) => page - 1)}
                className="rounded-lg bg-gray-300 p-1"
              >
                <Prev />
              </button>
            )}
            {<p>{page}</p>}
            {page < totalPages ? (
              <button
                onClick={() => setPage((page) => page + 1)}
                className="rounded-lg bg-gray-300 p-1"
              >
                <Next />
              </button>
            ) : (
              <button
                disabled
                onClick={() => setPage((page) => page + 1)}
                className="rounded-lg bg-gray-300 p-1"
              >
                <Next />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default BackgroundChanger;
