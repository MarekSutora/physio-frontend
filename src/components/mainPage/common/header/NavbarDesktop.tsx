import React from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import AuthButtons from "@/components/auth/authButtons/AuthButtons";
import { usePathname } from "next/navigation";
import { TMainPageLink } from "@/lib/shared/types";

type NavbarDesktopProps = {
  links: TMainPageLink[];
};

const NavbarDesktop = ({ links }: NavbarDesktopProps) => {
  const currentPath = usePathname();

  return (
    <nav className="flex h-full w-auto items-center">
      <ul className="mr-6 flex h-full items-center justify-evenly text-lg">
        {links.map((link) => {
          const hasSubMenuItems =
            link.subMenuItems && link.subMenuItems.length > 0;

          return (
            <li
              key={link.text}
              className="group relative flex h-full flex-col items-center justify-center pr-6"
            >
              {hasSubMenuItems ? (
                <div className="flex h-full cursor-pointer items-center text-lg font-medium">
                  {link.text}
                  <FaAngleDown className="ml-1 inline transition-all duration-300 ease-in-out group-hover:rotate-180" />
                  <div className="absolute top-full hidden group-hover:block">
                    <ul className="w-56 border-t-[1px] bg-white shadow-lg">
                      {link.subMenuItems!.map((subItem) => (
                        <li
                          key={subItem.text}
                          className="border-b-[1px] p-2 hover:bg-gray-200"
                        >
                          <Link href={subItem.path} className="block">
                            {subItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                link.path && (
                  <div className="group relative flex cursor-pointer flex-col items-center justify-center">
                    <Link
                      href={link.path!}
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
                  </div>
                )
              )}
            </li>
          );
        })}
      </ul>
      <AuthButtons />
    </nav>
  );
};

export default NavbarDesktop;
