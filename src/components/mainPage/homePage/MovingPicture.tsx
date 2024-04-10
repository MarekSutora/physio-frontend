"use client";

import React from "react";
import studioImage from "@/root/public/studio11.png"; // Adjust the import path as needed
import useMediaQuery from "@/lib/hooks/useMediaQuery";

const MovingPicture = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1280px)");

  if (!isAboveMediumScreens) return null;

  return (
    <>
      <style jsx>{`
        .bg-studio {
          background-image: url("${studioImage.src}");
        }
      `}</style>
      <div className="bg-studio flex h-[350px] w-full flex-col items-center justify-center bg-cover bg-fixed bg-no-repeat"></div>
    </>
  );
};

export default MovingPicture;
