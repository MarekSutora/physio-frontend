import React from "react";
import { Turn as Hamburger } from "hamburger-react";

const ToggleNavbarButton = ({ toggle }: { toggle: any }) => {
  return (
    <div className="flex h-6 w-auto items-center justify-end">
      <Hamburger rounded onToggle={toggle} distance="sm" duration={0.3} />
    </div>
  );
};

export default ToggleNavbarButton;
