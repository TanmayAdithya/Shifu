"use client";

import React, { useEffect, useRef, useState } from "react";
import { background } from "@/types/types";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MdKeyboardArrowRight as Next,
  MdKeyboardArrowLeft as Prev,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "@/store/slices/backgroundSlice";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AppDispatch } from "@/store/store";
import { fetchVideos } from "@/store/slices/youtubeSlice";
import { RootState } from "@/store/rootReducer";
const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

function BackgroundChanger() {
  const [backgrounds, setBackgrounds] = useState<background[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 1000);
  const dispatch: AppDispatch = useDispatch();
  const { videos, status, error } = useSelector(
    (state: RootState) => state.youtube,
  );
  const youtubeVideos = videos.flat();

  const [mediaLoadingState, setMediaLoadingState] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

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

  const [activeTab, setActiveTab] = useState<string>("images");

  const handleMediaLoad = (id: string) => {
    setMediaLoadingState((prevState) => ({ ...prevState, [id]: true }));
  };

  const videoTags = {
    Ambience: "UCqRTj-Nu_8to3jIBlXptOtA", // Ambience
    Study: "UCwaMXiEfLn3UtpC2I0E2jxQ", // Study
    Earth: "UCb57aRZr3KsykS_wNsD5Ptw", // Earth
    Relax: "UC95bEkaIgwhxSjSsdMFXYGg", // Relax
    "Sci-Fi": "UCDyghjHud0sexPHxs5qPXUQ", // Scifi
    Cafe: "UC84t1K5ri-7u9bFCaUKTXDA", // Cafe
  };

  const handleBackground = (
    url: string,
    name: string,
    portfolio_url: string,
  ) => {
    dispatch(setBackground({ url, name, portfolio_url }));
  };

  return (
    <>
      <Tabs
        defaultValue="images"
        className="p-1"
        onValueChange={(value) => {
          setSearch("");
          setActiveTab(value);
        }}
      >
        <div className="flex gap-2">
          <Input
            value={search}
            type="text"
            placeholder="Search backgrounds"
            className="w-full rounded-md p-2 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <TabsList className="border bg-transparent shadow-sm dark:border-neutral-800 dark:bg-transparent">
            <TabsTrigger
              className="data-[state=active]:text-neutral-800 dark:data-[state=active]:text-neutral-100"
              value="images"
            >
              Images
            </TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="mt-2" value="images">
          {/* Image Grid */}
          <div
            className={`mt-4 ${debouncedSearch ? "max-h-[12rem]" : "max-h-[14rem]"} w-full overflow-auto`}
          >
            <div className={`grid w-full grid-cols-2 gap-2`}>
              {loading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[113px] w-[199px] rounded"
                  />
                ))}
              {errorState && (
                <p>Something went wrong while fetching images: {errorState}</p>
              )}

              {backgrounds.map(({ id, urls, user }) => (
                <div
                  key={id}
                  className="relative rounded border shadow-lg transition-colors duration-500 dark:border dark:border-neutral-900 dark:hover:border-neutral-400"
                >
                  {!mediaLoadingState[id] && (
                    <div className="absolute inset-0">
                      <Skeleton
                        key={id}
                        className="h-[113px] w-[199px] rounded"
                      />
                    </div>
                  )}

                  <img
                    alt={`Photo by ${user.name}`}
                    src={`${urls.full}&w=1920&h=1080&fit=crop`}
                    width="320"
                    height="180"
                    style={{
                      opacity: mediaLoadingState[id] ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleBackground(urls.full, user.name, user.portfolio_url)
                    }
                    onLoad={() => handleMediaLoad(id)}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="videos">
          {/* <BackgroundVideos /> */}
          <div
            className={`mt-2 ${debouncedSearch ? "max-h-[12rem]" : "max-h-[14.5rem]"} w-full overflow-auto`}
          >
            <Tabs defaultValue={videoTags.Ambience} className="w-full">
              <TabsList className="border shadow-sm dark:border-neutral-800 dark:bg-transparent">
                {Object.entries(videoTags).map(([key, value]) => (
                  <TabsTrigger key={key.toLowerCase()} value={value}>
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(videoTags).map(([key, value]) => {
                const filteredVideos = youtubeVideos.filter(
                  (video) => video && video.snippet.channelId === value,
                );

                return (
                  <TabsContent key={key.toLowerCase()} value={value}>
                    <div className={`grid w-full grid-cols-2 gap-2`}>
                      {status === "loading" &&
                        Array.from({ length: 9 }).map((_, index) => (
                          <Skeleton
                            key={index}
                            className="aspect-video h-full"
                          />
                        ))}
                      {error && (
                        <p>
                          Something went wrong while fetching videos: {error}
                        </p>
                      )}

                      {filteredVideos.map((video) => {
                        const snippet = video.snippet;
                        const { title, thumbnails, resourceId } = snippet;
                        const videoId = resourceId.videoId;

                        const url =
                          thumbnails?.maxres?.url || // Fallback 1: maxres
                          thumbnails?.high?.url || // Fallback 2: high
                          thumbnails?.medium?.url || // Fallback 3: medium
                          thumbnails?.low?.url || // Fallback 4: low
                          thumbnails?.default?.url || // Fallback 5: default
                          "https://via.placeholder.com/200";

                        return (
                          <div
                            key={videoId}
                            className="relative rounded border shadow-lg transition-colors duration-500 dark:border dark:border-neutral-900 dark:hover:border-neutral-400"
                          >
                            {!mediaLoadingState[videoId] && (
                              <div className="absolute inset-0">
                                <Skeleton
                                  key={title}
                                  className="h-[113px] w-[199px] rounded"
                                />
                              </div>
                            )}

                            <img
                              alt={title}
                              src={url}
                              width="320"
                              height="180"
                              style={{
                                opacity: mediaLoadingState[videoId] ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              // onClick={}
                              onLoad={() => handleMediaLoad(videoId)}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>

      <div
        className={`mt-3 transition-opacity duration-200 ${
          debouncedSearch ? "opacity-100" : "pointer-events-none opacity-0"
        } flex items-center justify-center gap-2 px-1`}
      >
        {activeTab === "images" ? (
          <>
            <p className="flex text-sm text-neutral-500 dark:text-neutral-600">
              {page}/{totalPages}
            </p>
            <div className="h-[2px] w-full bg-neutral-400 dark:bg-neutral-800"></div>
            <button
              onClick={() => setPage((page) => page - 1)}
              disabled={page <= 1}
              className={`rounded-lg bg-neutral-200 p-1 dark:bg-neutral-700 ${
                page > 1 ? "hover:bg-neutral-300/80" : "opacity-20"
              }`}
            >
              <Prev />
            </button>
            <button
              disabled={page < totalPages}
              onClick={() => setPage((page) => page + 1)}
              className={`rounded-lg bg-neutral-200 p-1 dark:bg-neutral-700 ${
                page < totalPages ? "hover:bg-neutral-300/80" : "opacity-20"
              }`}
            >
              <Next />
            </button>
          </>
        ) : (
          <p className="text-neutral-500 dark:text-neutral-100">
            No pagination needed for videos
          </p>
        )}
      </div>
    </>
  );
}

export default BackgroundChanger;
