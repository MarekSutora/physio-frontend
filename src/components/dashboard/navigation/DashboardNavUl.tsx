"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { dashboardLinks } from "@/lib/shared/constants";
import DashboardMenuItem from "./DashboardMenuItem";
import { useRouter } from "next/navigation";

type Props = {
  mobileCloseFunction?: () => void;
};

const DashboardNavUl = ({ mobileCloseFunction }: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const router = useRouter();
  
  useEffect(() => {
    if (status === "loading") return;

    if (status !== "authenticated" || (user && user.roles.length === 0)) {
      router.push("/");
    }
  }, [user, router, status]);

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
