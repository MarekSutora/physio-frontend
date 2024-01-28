import React, { ReactNode } from "react";

type Props = {
  children: ReactNode; // This is where you pass the child components
};

const DashboardComponentWrapper = ({ children }: Props) => {
  return (
    <div className="m-1 h-auto w-auto bg-white p-4 md:rounded-lg md:shadow-lg">
      {children}
    </div>
  );
};

export default DashboardComponentWrapper;
