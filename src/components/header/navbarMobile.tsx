import React, { useState } from "react";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";

const NavbarMobile = () => {
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

  return (
    <motion.nav
      className="z-40 h-full w-full border bg-slate-50"
      initial={{ y: -1000, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.4 }}
    >
      <ul className="flex w-full flex-col font-semibold">
        {basicLinks.map((link) => (
          <li
            key={link.text}
            className="w-full cursor-pointer text-xl transition-all duration-700 ease-in-out"
          >
            {link.subMenuItems ? (
              <div>
                <button
                  className="flex w-full items-center gap-1 px-9 py-3"
                  onClick={() => handleItemWithSubMenuClick(link.text)}
                >
                  {link.text}
                  <motion.div
                    animate={{
                      rotate: toggledItemsWithSubMenu.includes(link.text)
                        ? 180
                        : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <FaAngleDown />
                  </motion.div>
                </button>
                {toggledItemsWithSubMenu.includes(link.text) && (
                  <motion.ul
                    style={{ overflow: "hidden" }}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.5 }}
                    exit={{ height: 0 }}
                  >
                    {link.subMenuItems.map((subLink) => (
                      <li
                        key={subLink.text}
                        className="w-auto whitespace-nowrap pl-14"
                      >
                        <Link href={subLink.path}>{subLink.text}</Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ) : (
              <div className="px-10 py-3">
                <Link href={link.path}>{link.text}</Link>
              </div>
            )}
            <div className="h-[1px] w-full bg-slate-200"></div>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default NavbarMobile;
