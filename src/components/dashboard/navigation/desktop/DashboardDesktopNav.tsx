import { dashboardLinks } from "@/lib/shared/constants";
import React from "react";
import SidePanelMenuItem from "../DashboardMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

type Props = {};

const DashboardDesktopNav = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  console.log(user);

  return (
    <nav className="h-full w-[240px] bg-secondary">
      <ul className="flex h-full flex-col py-8">
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
  );
};

export default DashboardDesktopNav;
