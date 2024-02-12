"use client";

import LogoImage from "@/components/mainPage/common/logo/LogoImage";
import { dashboardLinks } from "@/lib/shared/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import SidePanelMenuItem from "../DashboardMenuItem";
import { useSession } from "next-auth/react";
import ToggleNavbarButton from "@/components/mainPage/common/header/ToggleNavbarButton";

type Props = {};

const DashboardMobileNav = (props: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[75px] flex-row items-center justify-between bg-primary p-2">
        <Link href="/">
          <LogoImage style="w-16 h-16" fill="white" />
        </Link>
        <div className="text-white">
          <ToggleNavbarButton
            setIsMenuToggled={setIsMenuToggled}
            isMenuToggled={isMenuToggled}
          />
        </div>
      </div>

      {isMenuToggled && (
        <motion.nav
          className="fixed top-[75px] z-50 h-screen w-full overflow-hidden  bg-primary"
          initial={{ y: -1000, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <nav>
            <ul className="flex flex-col">
              {user?.roles.includes("Admin") &&
                dashboardLinks.admin.map((link) => {
                  return (
                    <SidePanelMenuItem
                      key={link.text}
                      text={link.text}
                      icon={link.icon}
                      path={link.path}
                    />
                  );
                })}
              {user?.roles.includes("Patient") &&
                dashboardLinks.patient.map((link) => {
                  return (
                    <SidePanelMenuItem
                      key={link.text}
                      text={link.text}
                      icon={link.icon}
                      path={link.path}
                    />
                  );
                })}
            </ul>
          </nav>
        </motion.nav>
      )}
    </div>
  );
};

export default DashboardMobileNav;
