import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PiSignOut } from "react-icons/pi";

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>
      <PiSignOut className="inline-block w-5 group-hover:scale-[1.10]" />{" "}
      Odhlásiť sa
    </Button>
  );
};

export default LogoutButton;
