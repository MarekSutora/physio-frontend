import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MobileMenuItemProps = {
  text: string;
  path?: string;
  subMenuItems?: { text: string; path: string }[];
  closeMenu?: () => void;
};

const MobileMenuItem = ({
  text,
  path,
  subMenuItems,
  closeMenu,
}: MobileMenuItemProps) => {
  const currentPath = usePathname();
  const isActive = path && currentPath === path;
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
      {subMenuItems && subMenuItems.length > 0 ? (
        <div className="h-full w-full">
          <button
            className={cn(
              isActive && " bg-gray-200",
              "flex w-full flex-row items-center justify-between gap-2 border-t-[1px] border-gray-200 py-2 pl-3 pr-5 text-lg font-medium",
            )}
            onClick={() => handleItemWithSubMenuClick(text)}
          >
            <span className="w-full text-start">{text}</span>
            <motion.div
              animate={{
                rotate: toggledItemsWithSubMenu.includes(text) ? 180 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="text-black">
                <FaAngleDown />
              </div>
            </motion.div>
          </button>

          <AnimatePresence>
            {toggledItemsWithSubMenu.includes(text) && (
              <motion.ul
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex w-full flex-col overflow-hidden"
              >
                {subMenuItems.map((subItem) => (
                  <li
                    key={subItem.text}
                    className="flex h-12 items-center  justify-center"
                    onClick={closeMenu}
                  >
                    <Link
                      href={subItem.path}
                      className={cn(
                        subItem.path === currentPath && "bg-gray-200",
                        "flex  h-full  w-full items-center border-t-[1px] border-gray-200 pl-8 pr-2 text-base font-medium",
                      )}
                    >
                      {subItem.text}
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
            isActive && "bg-gray-200",
            "flex w-full flex-row items-center gap-2 border-t-[1px] border-gray-200 py-2 pl-3 pr-2 text-lg font-medium text-black transition-all duration-200",
          )}
          href={path!}
          onClick={closeMenu}
        >
          {text}
        </Link>
      )}
    </>
  );
};

export default MobileMenuItem;
