"use client";

import { dashboardLinks } from "@/lib/shared/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

type Props = {
  text: string;
  path?: string;
  icon: React.ReactNode;
  subMenuItems?: { text: string; path: string }[];
};

const DashboardMenuItem = ({ text, path, icon, subMenuItems }: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;
  const { data: session } = useSession();
  const [toggledItemsWithSubMenu, setToggledItemsWithSubMenu] = useState<
    string[]
  >([]);

  const handleItemWithSubMenuClick = (item: string) => {
    if (toggledItemsWithSubMenu.includes(item)) {
      setToggledItemsWithSubMenu(
        toggledItemsWithSubMenu.filter((i) => i !== item),
      );
    } else {
      setToggledItemsWithSubMenu([...toggledItemsWithSubMenu, item]);
    }
  };

  const user = session?.user;

  // Variants for Framer Motion to control animations
  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <>
      {subMenuItems ? (
        <div>
          <button
            className={cn(
              isActive &&
                "flex w-full cursor-default flex-row items-center justify-between gap-2 bg-white px-5 py-2 text-lg text-primary transition-all duration-200 ease-in-out",
              !isActive &&
                "group flex w-full flex-row items-center justify-between gap-2 rounded-md px-5 py-2 text-lg text-white transition-all duration-200 ease-in-out",
              "font-medium",
            )}
            onClick={() => handleItemWithSubMenuClick(text)}
          >
            <div className="scale-125 transition-all duration-200 ease-in-out hover:underline group-hover:scale-[1.35] group-active:scale-[1.35]">
              {icon}
            </div>
            <span className="w-full text-start">{text}</span>

            <motion.div
              animate={{
                rotate: toggledItemsWithSubMenu.includes(text) ? 180 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <FaAngleDown />
            </motion.div>
          </button>
          <AnimatePresence>
            {toggledItemsWithSubMenu.includes(text) && (
              <motion.ul
                style={{ overflow: "hidden" }}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex w-full flex-col  text-white "
              >
                {subMenuItems.map((subLink) => (
                  <li
                    key={subLink.text}
                    className="h-full w-full py-1 pl-12 hover:bg-primary/70"
                  >
                    <Link href={subLink.path}>{subLink.text}</Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          className={cn(
            isActive &&
              "flex w-full cursor-default flex-row items-center gap-2 bg-white py-2 pl-5 text-lg text-primary transition-all duration-200 ease-in-out",
            !isActive &&
              "ease-in-ou group flex w-full flex-row items-center gap-2 rounded-md py-2 pl-5 text-lg text-white transition-all duration-200",
            "font-medium",
          )}
          href={path!}
        >
          <div className="scale-125 transition-all duration-200 ease-in-out hover:underline group-hover:scale-[1.35] group-active:scale-[1.35]">
            {icon}
          </div>
          {text}
        </Link>
      )}
    </>
  );
};

export default DashboardMenuItem;
