"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { dashboardLinks } from "@/lib/shared/constants";
import DashboardMenuItem from "./DashboardMenuItem";

type Props = {
  mobileCloseFunction?: () => void;
};

const DashboardNavUl = ({ mobileCloseFunction }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <ul className="flex h-full flex-col">
      {user?.roles.includes("Admin") &&
        dashboardLinks.admin.map((link) => (
          <li key={link.text}>
            <DashboardMenuItem
              {...link}
              mobileCloseFunction={mobileCloseFunction}
            />
          </li>
        ))}
      {user?.roles.includes("Client") &&
        dashboardLinks.client.map((link) => (
          <li key={link.text}>
            <DashboardMenuItem
              {...link}
              mobileCloseFunction={mobileCloseFunction}
            />
          </li>
        ))}
    </ul>
  );
};

export default DashboardNavUl;
