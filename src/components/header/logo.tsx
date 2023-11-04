import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="hover:cursor-pointer"
        src="/logo_and_text.svg"
        alt="logo"
        width={300}
        height={250}
        priority={true}
      />
    </Link>
  );
};

export default Logo;
