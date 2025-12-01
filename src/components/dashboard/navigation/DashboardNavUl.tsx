"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { dashboardLinks } from "@/lib/shared/constants";
import DashboardMenuItem from "./DashboardMenuItem";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/auth/authButtons/LogoutButton";

type Props = {
  mobileCloseFunction?: () => void;
};

const DashboardNavUl = ({ mobileCloseFunction }: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const router = useRouter();

  console.log("DashboardNavUl - user:", user);

  useEffect(() => {
    if (status === "loading") return;

    if (status !== "authenticated" || (user && user.roles.length === 0)) {
      router.push("/");
    }
  }, [user, router, status]);

  return (
    <>
      <ul className="flex h-full flex-col">
        {user?.roles.includes("ADMIN") &&
          dashboardLinks.admin.map((link) => (
            <li key={link.text}>
              <DashboardMenuItem
                {...link}
                mobileCloseFunction={mobileCloseFunction}
              />
            </li>
          ))}
        {user?.roles.includes("CLIENT") &&
          dashboardLinks.client.map((link) => (
            <li key={link.text}>
              <DashboardMenuItem
                {...link}
                mobileCloseFunction={mobileCloseFunction}
              />
            </li>
          ))}
        <LogoutButton
          isDashboard={true}
          className="border-b-[1px] border-white py-2 xl:hidden xl:border-0 xl:py-0"
        />
      </ul>
    </>
  );
};

export default DashboardNavUl;
