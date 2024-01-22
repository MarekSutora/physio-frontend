"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { userLinks } from "@/lib/shared/constants";

type Props = {};

const AuthButtons = (props: Props) => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="ml-auto flex gap-4">
        <p className="text-sky-600">{session.user.fullName}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
      <LoginButton text={userLinks[0].text} path={userLinks[0].path} />
      <RegisterButton text={userLinks[1].text} path={userLinks[1].path} />
    </>
  );
};

export default AuthButtons;
