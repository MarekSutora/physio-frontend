import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

type SubMenuItem = {
  text: string;
  path: string;
};

type MobileMenuItemProps = {
  text: string;
  path?: string;
  subMenuItems?: { text: string; path: string }[];
};

const MobileMenuItem = ({ text, path, subMenuItems }: MobileMenuItemProps) => {
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
    <div
      className={`border-b border-gray-200 ${isActive ? "bg-gray-200" : "bg-white"}`}
    >
      {subMenuItems && subMenuItems.length > 0 ? (
        <>
          <button
            className={`flex w-full items-center justify-between p-4 text-left ${isActive ? "text-blue-600" : "text-gray-700"} hover:bg-gray-100`}
            onClick={() => handleItemWithSubMenuClick(text)}
          >
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
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.3 }}
                className="pl-4"
              >
                {subMenuItems.map((subItem) => (
                  <li key={subItem.text} className="py-2">
                    <Link
                      href={subItem.path}
                      className={`block px-4 py-2 hover:bg-gray-100 ${currentPath === subItem.path ? "text-blue-600" : "text-gray-700"}`}
                    >
                      {subItem.text}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={path || "#"}
          className={`block p-4 ${isActive ? "text-blue-600" : "text-gray-700"} hover:bg-gray-100`}
        >
          {text}
        </Link>
      )}
    </div>
  );
};

export default MobileMenuItem;
