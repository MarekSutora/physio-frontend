"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { userLinks } from "@/lib/shared/constants";
import LogoutButton from "./LogoutButton";

type Props = {};

const AuthButtons = (props: Props) => {
  const { data: session } = useSession();

  if (session && session.user) {
    return <LogoutButton />;
  }
  
  return (
    <>
      <LoginButton text={userLinks[0].text} path={userLinks[0].path} />
      <RegisterButton text={userLinks[1].text} path={userLinks[1].path} />
    </>
  );
};

export default AuthButtons;
