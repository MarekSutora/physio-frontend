"use client";

import loginPic from "../../../public/login.png";
import Image from "next/image";
import React, { useState } from "react";

const Login = () => {
  return (
    <section className="h-[575px] w-full bg-white">
      <div className="m flex md:flex-col">
        <Image src={loginPic} alt="LoginImage" width={300}></Image>
      </div>
    </section>
  );
};

export default Login;
