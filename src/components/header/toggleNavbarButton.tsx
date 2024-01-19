import React from "react";
import { Turn as Hamburger } from "hamburger-react";

type ToggleNavbarButtonProps = {
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuToggled: boolean;
};

const ToggleNavbarButton = ({
  setIsMenuToggled,
  isMenuToggled,
}: ToggleNavbarButtonProps) => {
  return (
    <div className="flex h-6 w-auto items-center justify-end">
      <Hamburger
        rounded
        toggled={isMenuToggled}
        toggle={setIsMenuToggled}
        distance="sm"
        duration={0.3}
      />
    </div>
  );
};

export default ToggleNavbarButton;
