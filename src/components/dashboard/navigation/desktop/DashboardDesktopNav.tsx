import { dashboardLinks } from "@/lib/shared/constants";
import React from "react";
import SidePanelMenuItem from "../SidePanelMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

type Props = {};

const DashboardDesktopNav = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <nav className="h-full w-[220px]">
      <ul className="flex flex-col py-8">
        {dashboardLinks.admin.map((link) => {
          return (
            <SidePanelMenuItem
              key={link.text}
              text={link.text}
              icon={link.icon}
              path={link.path}
            />
          );
        })}
        {user?.role === "Physiotherapist" &&
          dashboardLinks.physiotherapist.map((link) => {
            return (
              <SidePanelMenuItem
                key={link.text}
                text={link.text}
                icon={link.icon}
                path={link.path}
              />
            );
          })}
        {user?.role === "Patient" &&
          dashboardLinks.physiotherapist.map((link) => {
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
