"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { dashboardLinks } from "@/lib/shared/constants";
import DashboardMenuItem from "./DashboardMenuItem";

const DashboardNavUl = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <ul className="flex h-full flex-col">
      {user?.roles.includes("Admin") &&
        dashboardLinks.admin.map((link) => (
          <li key={link.text}>
            <DashboardMenuItem {...link} />
          </li>
        ))}
    </ul>
  );
};

export default DashboardNavUl;
