"use client";

import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MdKeyboardArrowRight as Next,
  MdKeyboardArrowLeft as Prev,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentBackground,
  fetchDefaultBackgrounds,
  fetchSearchBackgrounds,
  setBackgroundImage,
  setBackgroundVideo,
  updateCurrentBackground,
} from "@/store/slices/backgroundSlice";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AppDispatch } from "@/store/store";
import { fetchVideos, searchVideos } from "@/store/slices/youtubeSlice";
import { RootState } from "@/store/rootReducer";
import { TailSpin } from "react-loader-spinner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BackgroundChanger: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 1000);
  const videoTags = {
    Ambience: "UCqRTj-Nu_8to3jIBlXptOtA",
    Study: "UCwaMXiEfLn3UtpC2I0E2jxQ",
    Earth: "UCb57aRZr3KsykS_wNsD5Ptw",
    Relax: "UC95bEkaIgwhxSjSsdMFXYGg",
    "Sci-Fi": "UCDyghjHud0sexPHxs5qPXUQ",
    Cafe: "UCJIOFQLGwB3GH9K9waxwynQ",
  };
  const dispatch: AppDispatch = useDispatch();

  const { backgrounds, loading, error, mediaLoading, totalPages } = useSelector(
    (state: RootState) => state.background,
  );

  const isGlassMode = useSelector(
    (state: RootState) => state.theme.isGlassMode,
  );

  const {
    videos,
    status,
    error: videoError,
  } = useSelector((state: RootState) => state.youtube);

  const youtubeVideos = videos.flat();

  const [mediaLoadingState, setMediaLoadingState] = useState<
    Record<string, boolean>
  >({});

  const [selectedMedia, setSelectedMedia] = useState<string>("");

  const [activeTab, setActiveTab] = useState<string>("images");

  const handleMediaLoad = useCallback((id: string) => {
    setMediaLoadingState((prevState) => ({ ...prevState, [id]: true }));
  }, []);

  const handleBackground = useCallback(
    (mediaRef: string, name: string, portfolio_url: string, id: string) => {
      setSelectedMedia(id);
      dispatch(
        setBackgroundImage({ active: "image", mediaRef, name, portfolio_url }),
      );
      dispatch(
        updateCurrentBackground({
          active: "image",
          mediaRef,
          name,
          portfolio_url,
        }),
      );
    },
    [dispatch],
  );

  const handleSetVideo = useCallback((videoId: string) => {
    dispatch(setBackgroundVideo(videoId));
    dispatch(updateCurrentBackground({ active: "video", mediaRef: videoId }));
  }, []);

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchCurrentBackground());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch) {
      if (activeTab === "images") {
        dispatch(fetchSearchBackgrounds({ query: debouncedSearch, page }));
      } else {
        dispatch(searchVideos({ query: debouncedSearch }));
      }
    } else {
      if (activeTab === "images") {
        dispatch(fetchDefaultBackgrounds());
      } else {
        dispatch(fetchVideos());
      }
    }
  }, [debouncedSearch, page, dispatch]);

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
            className={`w-full rounded-md p-2 outline-none ${isGlassMode ? "border-neutral-50/45 text-neutral-50 placeholder:text-neutral-100 focus-visible:ring-neutral-50/60" : ""} `}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TabsList
            className={`border ${isGlassMode ? "dark:border-neutral-50/15" : "dark:border-neutral-800"} bg-transparent shadow-sm dark:bg-transparent`}
          >
            <TabsTrigger
              className={`data-[state=active]:text-neutral-800 dark:data-[state=active]:text-neutral-100 ${isGlassMode ? "text-neutral-50" : ""}`}
              value="images"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              className={`${isGlassMode ? "text-neutral-50" : ""}`}
              value="videos"
            >
              Videos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent className="mt-2" value="images">
          {/* Image Grid */}
          <div
            className={`mt-4 ${debouncedSearch ? "max-h-[12rem]" : "max-h-[14rem]"} w-full overflow-auto`}
          >
            {error && (
              <Alert variant="destructive" className="mb-2">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className={`grid w-full grid-cols-2 gap-2`}>
              {loading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[113px] w-[199px] rounded"
                  />
                ))}

              {backgrounds.map(({ id, urls, user }) => (
                <div
                  key={id}
                  className={`relative rounded border shadow-lg transition-colors duration-500 ${isGlassMode ? "border-neutral-50/0 hover:border-neutral-50/80" : "dark:border dark:border-neutral-900 dark:hover:border-neutral-400"}`}
                >
                  {!mediaLoadingState[id] && (
                    <div className="absolute inset-0">
                      <Skeleton
                        key={id}
                        className="h-[113px] w-[199px] rounded"
                      />
                    </div>
                  )}
                  {mediaLoading && selectedMedia === id && (
                    <div className="absolute inset-0 flex items-center justify-center rounded bg-neutral-900/70">
                      <TailSpin
                        visible={true}
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
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
                      handleBackground(
                        urls.full,
                        user.name,
                        user.portfolio_url,
                        id,
                      )
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
          <div
            className={`mt-2 ${debouncedSearch ? "max-h-[12rem]" : "max-h-[14.5rem]"} w-full overflow-auto`}
          >
            {error && (
              <Alert variant="destructive" className="mb-2">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Tabs defaultValue={videoTags.Ambience} className="w-full">
              {!debouncedSearch && (
                <TabsList
                  className={`border ${isGlassMode ? "text-neutral-100 dark:border-neutral-50/15" : "dark:border-neutral-800"} bg-transparent shadow-sm dark:bg-transparent`}
                >
                  {Object.entries(videoTags).map(([key, value]) => (
                    <TabsTrigger key={key.toLowerCase()} value={value}>
                      {key}
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}

              {Object.entries(videoTags).map(([key, value]) => {
                const filteredVideos = debouncedSearch
                  ? youtubeVideos
                  : youtubeVideos.filter(
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
                      {videoError && (
                        <Alert variant="destructive" className="mb-2">
                          <ExclamationTriangleIcon className="h-4 w-4" />
                          <AlertTitle>Something went wrong</AlertTitle>
                          <AlertDescription>{videoError}</AlertDescription>
                        </Alert>
                      )}

                      {filteredVideos.map((video) => {
                        const snippet = video.snippet;
                        const { title, thumbnails } = snippet;

                        const videoId =
                          "id" in video
                            ? video.id.videoId
                            : video.snippet.resourceId?.videoId;

                        const url =
                          thumbnails?.maxres?.url ||
                          thumbnails?.high?.url ||
                          thumbnails?.medium?.url ||
                          thumbnails?.low?.url ||
                          thumbnails?.default?.url ||
                          "https://via.placeholder.com/200";

                        return (
                          <div
                            key={videoId}
                            className="relative rounded transition-colors duration-500 dark:border dark:border-neutral-900 dark:shadow-lg dark:hover:border-neutral-400"
                            onClick={() => handleSetVideo(videoId)}
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
            <p
              className={`flex ${isGlassMode ? "text-neutral-600 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-600"} text-sm`}
            >
              {page}/{totalPages}
            </p>
            <div
              className={`h-[2px] ${isGlassMode ? "bg-neutral-500 dark:bg-neutral-500" : "bg-neutral-400 dark:bg-neutral-800"} w-full`}
            ></div>
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
              disabled={page >= totalPages}
              onClick={() => setPage((page) => page + 1)}
              className={`rounded-lg bg-neutral-200 p-1 dark:bg-neutral-700 ${
                page < totalPages ? "hover:bg-neutral-300/80" : "opacity-20"
              }`}
            >
              <Next />
            </button>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default BackgroundChanger;
