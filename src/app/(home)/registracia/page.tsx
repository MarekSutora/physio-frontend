import React from "react";
import registerPic from "@/root/public/login.png";
import Image from "next/image";
import RegistrationForm from "@/components/auth/RegistrationForm";

export const metadata = {
  title: "Registrácia",
  description: "Registráčný formulár pre nových používateľov.",
};

const Page = () => {
  return (
    <section className="min-h-[700px] h-full w-full py-20">
      <div className="flex h-full items-center justify-center gap-7 md:flex-row">
        <Image
          src={registerPic}
          alt="RegisterImage"
          width={350}
          height={350}
          className="my-auto hidden h-[350px] w-[350px] rounded-2xl shadow-lg md:block"
        ></Image>
        <RegistrationForm />
      </div>
    </section>
  );
};

export default Page;
