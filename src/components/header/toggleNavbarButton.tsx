import React from "react";
import { FaBars } from "react-icons/fa";

type ToggleNavbarButtonProps = {
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuToggled: boolean;
};

const ToggleNavbarButton = ({
  setIsMenuToggled,
  isMenuToggled,
}: ToggleNavbarButtonProps) => {
  return (
    <div className="flex w-full items-center justify-end">
      <button
        onClick={() => {
          setIsMenuToggled(!isMenuToggled);
        }}
      >
        <FaBars className="h-auto w-7" />
      </button>
    </div>
  );
};

export default ToggleNavbarButton;
