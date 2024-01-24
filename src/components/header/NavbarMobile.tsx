import React, { useState } from "react";
import {
  basicLinks,
  socialMediaLinks,
  userLinks,
} from "@/lib/shared/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import LoginButton from "@/components/auth/AuthButtons/LoginButton";
import RegisterButton from "@/components/auth/AuthButtons/RegisterButton";

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
      className="z-1000 fixed h-screen w-full overflow-hidden border-l border-r border-t bg-slate-50"
      initial={{ y: -1000, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <ul className="flex w-full flex-col font-semibold">
        {basicLinks.map((link) => (
          <li key={link.text} className="w-full cursor-pointer text-xl">
            {link.subMenuItems ? (
              <div>
                <button
                  className="flex w-full items-center gap-1 px-9 py-3 transition-all ease-in-out hover:bg-slate-200 active:bg-slate-200"
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
                        className="w-auto whitespace-nowrap"
                      >
                        <Link href={subLink.path}>
                          <div className="h-full w-full py-1 pl-14 transition-all ease-in-out hover:bg-slate-200 focus:bg-slate-200">
                            {subLink.text}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ) : (
              <Link href={link.path}>
                <div className="h-full w-full px-9 py-3 transition-all ease-in-out hover:bg-slate-200 focus:border focus:bg-slate-200">
                  {link.text}
                </div>
              </Link>
            )}
            <div className="h-[1px] w-full bg-slate-200"></div>
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex items-center justify-center gap-3">
        <LoginButton text={userLinks[0].text} path={userLinks[0].path} />
        <RegisterButton text={userLinks[1].text} path={userLinks[1].path} />
      </ul>
      <ul className="mt-5 flex h-full justify-center gap-8">
        {socialMediaLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.path}>
              <div className="h-auto w-5 text-4xl text-primary transition-all duration-300 ease-in-out hover:scale-125">
                {link.icon}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default NavbarMobile;
