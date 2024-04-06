import Contact from "@/components/mainPage/homePage/Contact";
import React from "react";
import { contactInfo, socialMediaLinks } from "@/lib/shared/constants";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Kontakt",
  description: "Kontaktný formulár",
};

const Page = () => {
  return (
    <section className="h-full w-full bg-slate-50 py-5">
      <div className="flex w-full flex-row gap-3 pb-6">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Kontakt
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <Contact />
      <section className="flex w-full flex-col gap-2 text-nowrap text-center lg:w-1/3">
        <h1 className="text-3xl font-bold lg:pt-6">
          {contactInfo.companyName}
        </h1>
        <section>
          <h2 className="pt-6 text-2xl font-semibold">Adresa:</h2>
          <p className="pt-3 text-xl ">{contactInfo.address}</p>
          <p className="pt-3  text-xl ">
            {contactInfo.zip} {contactInfo.city}
          </p>
        </section>
        <section>
          <h2 className="pt-6 text-2xl font-semibold ">Kontaktné údaje:</h2>
          <a
            className="mx-auto flex justify-center gap-2 pt-3 text-center text-xl md:mx-0"
            href={`mailto:${contactInfo.email}`}
          >
            <div className="mt-[1px] text-3xl ">
              <IoIosMail />
            </div>
            <span>{contactInfo.email}</span>
          </a>
          <div className="mx-auto flex items-center justify-center gap-2 pt-3 text-xl  md:mx-0">
            <div className="text-3xl">
              <FaPhone className="h-[25px] w-[30px]" />
            </div>
            <span>{contactInfo.telephoneNumber}</span>
          </div>
        </section>
        <nav>
          <h2 className="pb-1 pt-6 text-2xl font-semibold ">Sociálne siete:</h2>
          <ul className="flex flex-row justify-around pt-9 text-primary lg:justify-around">
            {socialMediaLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>
                  <div className="scale-[2.4] text-2xl transition-all duration-300 ease-in-out hover:scale-[2.7]">
                    {link.icon}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </section>
  );
};

export default Page;
