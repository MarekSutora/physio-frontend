import useMediaQuery from "@/lib/hooks/useMediaQuery";
import React, { useState } from "react";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaUserPlus, FaUserTie } from "react-icons/fa";

const NavbarMobile = () => {
  return (
    <motion.div
      className="z-40 h-full w-full bg-slate-300"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    ></motion.div>
  );
};

export default NavbarMobile;
