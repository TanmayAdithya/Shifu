"use client";

import React, { useEffect } from "react";

async function getBackgrounds() {
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const controller = new AbortController();
  const signal = controller.signal;
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${apiKey}`,
      { signal },
    );

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const backgrounds = res.json();
    console.log(backgrounds);
  } catch (error) {
    console.error("Error fetching images from Unsplash: " + error);
  }

  return () => {
    controller.abort();
  };
}

function BackgroundChanger() {
  useEffect(() => {
    getBackgrounds();

    return;
  }, []);
  return (
    <div className="absolute z-40 mb-28 flex h-44 w-[28rem] rounded-xl bg-neutral-50 shadow-lg"></div>
  );
}

export default BackgroundChanger;
