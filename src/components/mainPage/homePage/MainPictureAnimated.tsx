"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import image1 from "@/root/public/MainImages/greenStudioPeople.webp";
import image2 from "@/root/public/MainImages/greenStudioPeople2.webp";

const images = [image1, image2];

const MainPictureAnimated = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(changeImage, 7000);
    return () => clearInterval(interval);
  }, [changeImage]);

  return (
    <AnimatePresence>
      <motion.div
        key={currentImage}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 2 }, scale: { duration: 7 } }}
        className="absolute inset-0"
      >
        <Image
          src={images[currentImage]}
          alt="representative-picture"
          fill
          style={{ objectFit: "cover" }}
          className="backdrop-brightness-50"
          quality={80}
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 75vw, 66vw"
          placeholder="blur"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPictureAnimated;
