import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="pb-4 hover:cursor-pointer"
        src="/logo_and_text.svg"
        alt="logo"
        width={250}
        height={200}
      />
    </Link>
  );
};

export default Logo;
