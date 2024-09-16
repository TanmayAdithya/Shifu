"use client";

import React, { useEffect, useState } from "react";
import { background } from "@/types/types";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MdKeyboardArrowRight as Next,
  MdKeyboardArrowLeft as Prev,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { setBackground } from "@/store/slices/backgroundSlice";
import { Input } from "../ui/input";
const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 1000);
  const dispatch = useDispatch();

  const [imageLoadingState, setImageLoadingState] = useState<
    Record<string, boolean>
  >({});

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   const fetchData = async () => {
  //     setLoading(true);
  //     setBackgrounds([]);

  //     try {
  //       let url = debouncedSearch
  //         ? `https://api.unsplash.com/search/photos?page=${page}&query=${debouncedSearch}&client_id=${apiKey}`
  //         : `https://api.unsplash.com/photos/?client_id=${apiKey}`;

  //       const res = await fetch(url, { signal });

  //       if (!res.ok) {
  //         throw new Error("Something went wrong!");
  //       }

  //       const data = await res.json();
  //       const fetchedBackgrounds = debouncedSearch ? data.results : data;
  //       const pages = debouncedSearch ? data.total_pages : 1;

  //       setBackgrounds(fetchedBackgrounds);
  //       setTotalPages(pages);
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

  const handleImageLoad = (id: string) => {
    setImageLoadingState((prevState) => ({ ...prevState, [id]: true }));
  };

  const tags = ["Nature", "Spring", "Summer", "Winter", "Orange"];

  const handleBackground = (
    url: string,
    name: string,
    portfolio_url: string,
  ) => {
    dispatch(setBackground({ url, name, portfolio_url }));
  };

  return (
    <>
      <div className="z-10 mt-4">
        <div className="mb-2 p-1">
          <Input
            type="text"
            placeholder="Search backgrounds"
            className="w-full rounded-md p-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap justify-center gap-2 px-1">
          {tags.map((tag) => (
            <button
              key={tag}
              className="flex-1 rounded-md border border-gray-400 px-3 py-1 text-sm text-neutral-700 transition-colors duration-200 hover:border-neutral-700 hover:bg-gray-600 hover:text-neutral-100 focus:bg-gray-600 focus:text-neutral-100 dark:border-neutral-800 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
              onClick={() => setSearch(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-h-[11rem] w-full overflow-auto">
        <div className={`grid w-full grid-cols-2 gap-2 p-1`}>
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-[113px] w-[200px] rounded" />
            ))}
          {error && <p>Something went wrong while fetching images: {error}</p>}

          {backgrounds.map(({ id, urls, user }) => (
            <div
              key={id}
              className="relative rounded border shadow-lg transition-colors duration-500 dark:border dark:border-neutral-900 dark:hover:border-neutral-400"
            >
              {!imageLoadingState[id] && (
                <div className="absolute inset-0">
                  <Skeleton key={id} className="h-[113px] w-[200px] rounded" />
                </div>
              )}

              <img
                alt={`Photo by ${user.name}`}
                src={`${urls.full}&w=1920&h=1080&fit=crop`}
                width="320"
                height="180"
                style={{
                  opacity: imageLoadingState[id] ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleBackground(urls.full, user.name, user.portfolio_url)
                }
                onLoad={() => handleImageLoad(id)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {debouncedSearch && (
          <div className="mb-4 mt-4 flex items-center justify-center gap-6">
            {page > 1 ? (
              <button
                onClick={() => setPage((page) => page - 1)}
                className="rounded-lg bg-gray-300 p-1 dark:bg-neutral-700"
              >
                <Prev />
              </button>
            ) : (
              <button
                disabled
                className="rounded-lg bg-gray-300 p-1 opacity-20 dark:bg-neutral-700"
              >
                <Prev />
              </button>
            )}
            <p>{page}</p>
            {page < totalPages ? (
              <button
                onClick={() => setPage((page) => page + 1)}
                className="rounded-lg bg-gray-300 p-1 transition-colors duration-200 dark:bg-neutral-700 dark:hover:bg-neutral-800"
              >
                <Next />
              </button>
            ) : (
              <button
                disabled
                className="rounded-lg bg-gray-300 p-1 opacity-20 dark:bg-neutral-700"
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
