import React from "react";
import registerPic from "@root/public/login.png";
import Image from "next/image";
import RegistrationForm from "@/components/auth/registrationForm";

type Props = {};

const Register = (props: Props) => {
  return (
    <section className="h-[800px] w-full bg-white">
      <div className="flex h-full justify-center gap-7 md:flex-row">
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

export default Register;
