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
  mobileCloseFunction?: () => void;
};

const DashboardMenuItem = ({
  text,
  path,
  icon,
  subMenuItems,
  mobileCloseFunction,
}: Props) => {
  const currentPath = usePathname();
  const isActive = currentPath === path;
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

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <>
      {subMenuItems ? (
        <div className="h-full w-full border-b-[1px] border-white xl:border-0">
          <button
            className={cn(
              isActive && "bg-white text-primary",
              !isActive && "group bg-primary text-white",
              "flex w-full flex-row items-center justify-between gap-2 py-2 pl-3 pr-2 text-lg font-medium",
            )}
            onClick={() => handleItemWithSubMenuClick(text)}
          >
            <div className="scale-125 hover:underline group-hover:scale-[1.35] group-active:scale-[1.35]">
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
                className="flex w-full flex-col text-white "
              >
                {subMenuItems.map((subLink) => (
                  <li key={subLink.text} onClick={mobileCloseFunction}>
                    <Link
                      className={cn(
                        subLink.path === currentPath && "bg-white text-primary",
                        !(subLink.path === currentPath) &&
                          "group text-white hover:bg-white hover:text-primary",
                        "flex h-full w-full flex-row items-center justify-between gap-2 border-t-[1px] border-white py-2 pl-8 pr-2 text-base font-medium xl:border-0",
                      )}
                      href={subLink.path}
                    >
                      {subLink.text}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          className={cn(
            isActive && "cursor-default bg-white text-primary",
            !isActive &&
              "ease-in-ou group text-white hover:bg-white hover:text-primary",
            "flex w-full flex-row items-center gap-2 border-b-[1px] border-white py-2 pl-3 pr-2 text-lg font-medium transition-all duration-200 xl:border-0",
          )}
          href={path!}
          onClick={mobileCloseFunction}
        >
          <div className="scale-125 hover:underline group-hover:scale-[1.35] group-active:scale-[1.35]">
            {icon}
          </div>
          {text}
        </Link>
      )}
    </>
  );
};

export default DashboardMenuItem;
