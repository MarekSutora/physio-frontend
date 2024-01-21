"use client";

import LoginForm from "@/components/auth/loginForm";
import loginPic from "../../../public/login.png";
import Image from "next/image";

const Login = () => {
  return (
    <section className="h-[575px] w-full bg-white">
      <div className="flex h-full justify-center gap-7 md:flex-row">
        <Image
          src={loginPic}
          alt="LoginImage"
          width={350}
          height={350}
          className="my-auto hidden h-[350px] w-[350px] rounded-2xl shadow-lg md:block"
        ></Image>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
