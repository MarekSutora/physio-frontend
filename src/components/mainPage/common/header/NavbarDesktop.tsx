import React from "react";
import { basicLinks } from "@/lib/shared/constants";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import { usePathname } from "next/navigation";

const NavbarDesktop = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex h-full w-auto items-center">
      <ul className="mr-6 flex items-center justify-evenly gap-6 text-lg">
        {basicLinks.map((link) => (
          <li
            key={link.text}
            className="group relative flex cursor-pointer flex-col items-center justify-center"
          >
            <Link
              href={link.path}
              className={`relative block hover:[text-shadow:-.05px_-.05px_0_rgba(0,0,0,0.5),.05px_.05px_0_rgba(0,0,0,0.5)] ${
                currentPath === link.path
                  ? "[text-shadow:-.05px_-.05px_0_rgba(0,0,0,0.5),.05px_.05px_0_rgba(0,0,0,0.5)]"
                  : ""
              } before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-200 hover:before:scale-x-100 ${
                currentPath === link.path ? "before:scale-x-100" : ""
              }`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <AuthButtons />
    </nav>
  );
};

export default NavbarDesktop;
