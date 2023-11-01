import React from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";

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
        {isMenuToggled ? (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <FaXmark className="h-auto w-8" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <FaBars className="h-auto w-7" />
          </motion.div>
        )}
      </button>
    </div>
  );
};

export default ToggleNavbarButton;
