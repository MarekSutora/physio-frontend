"use client";

import React from "react";
import studioImage from "@/root/public/studio11.png"; // Adjust the import path as needed

const MovingPicture = () => {
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
