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

  return (
    <div className="absolute z-40 mb-28 flex h-44 w-[28rem] rounded-xl bg-neutral-50 shadow-lg"></div>
  );
}

export default BackgroundChanger;
