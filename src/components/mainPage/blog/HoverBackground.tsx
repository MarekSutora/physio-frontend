"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const HoverBackground = ({ children }: Props) => {
  const randomHue = Math.floor(Math.random() * 360);
  const bgColor = `hsl(${randomHue}, 30%, 90%)`; // Low saturation and high lightness

  return (
    <motion.div
      className="relative"
      initial={{ width: 0 }}
      whileHover={{ width: "100%" }}
      transition={{ type: "tween" }}
    >
      <motion.div
        className="absolute bg-gray-100"
        style={{ backgroundColor: bgColor }}
        layoutId="hoverBackground"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default HoverBackground;
