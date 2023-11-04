import { socialMediaLinks } from "@/lib/shared/constants";
import Link from "next/link";
import React from "react";

const SocialMediaLinks = () => {
  return (
    <nav className="flex items-center gap-1">
      <ul>
        {socialMediaLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.path}
              className="h-auto w-5 text-2xl text-primary transition-all duration-300 ease-in-out hover:text-3xl"
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialMediaLinks;
