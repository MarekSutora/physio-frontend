"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import image1 from "@/root/public/MainImages/greenStudioPeople.webp";
import image2 from "@/root/public/MainImages/greenStudioPeople2.webp";
import image3 from "@/root/public/MainImages/greenStudioPeople3.webp";

const images = [image1, image2, image3];

const MainPictureAnimated = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

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
          priority
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default MainPictureAnimated;
