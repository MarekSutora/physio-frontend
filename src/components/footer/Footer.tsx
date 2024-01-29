import React from "react";
import { basicLinks, socialMediaLinks } from "@/lib/shared/constants";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "../logo/LogoImage";
import LogoText from "../logo/LogoText";
import { IoIosMail } from "react-icons/io";
import { contactInfo } from "@/lib/shared/constants";
import { FaPhone, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="h-auto w-full bg-primary text-slate-50">
      <div className="md:flex-start mx-auto flex h-5/6 w-5/6 flex-col gap-2 md:flex-row md:gap-10 md:pt-2">
        <Link href="/" className=" m-auto h-36 w-40 pt-2 md:m-0">
          <Image
            src="/image_textbelow_370_280.svg"
            alt="MoveLife Logo"
            priority
            width={370}
            height={280}
          />
        </Link>
        <div className="m-auto h-[1px] w-[100%] bg-slate-600 md:hidden"></div>
        <div className="md:flex-start flex flex-col gap-2 md:w-full md:flex-row md:pt-4">
          <div className="md:w-full">
            <p className="md:text pb-2 text-center font-bold md:text-left">
              NAVIGÁCIA
            </p>
            <nav>
              <ul className="text-md flex h-full flex-col justify-evenly gap-1 text-center text-sm md:text-left">
                {basicLinks.map(
                  (link) =>
                    !link.subMenuItems && (
                      <li key={link.text}>
                        <Link className="hover:underline" href={link.path}>
                          {link.text}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            </nav>
          </div>

          <div className="m-auto h-[1px] w-[60%] bg-slate-600 md:hidden"></div>

          <div className="h-full items-center md:w-full">
            <p className="pb-2 text-center font-bold md:text-left">KONTAKT</p>
            <nav className="mx-auto flex flex-col gap-2 text-sm  md:mx-0">
              <a
                className="mx-auto flex items-center gap-1 md:mx-0 "
                href={`mailto:${contactInfo.email}`}
              >
                <div className="pt-[2px] text-lg">
                  <IoIosMail />
                </div>
                {contactInfo.email}
              </a>
              <div className="mx-auto flex items-center gap-1 md:mx-0 ">
                <div className="pt-[2px] text-lg">
                  <FaPhone />
                </div>
                {contactInfo.telephoneNumber}
              </div>
              <a
                className="mx-auto flex items-center gap-1 md:mx-0 "
                href="https://www.google.com/maps/@78.2185899,15.5954893,3a,75y,70.19h,78.83t/data=!3m8!1e1!3m6!1sAF1QipNTNVt2CFZFCaSSVc-h6zWDCH-WPSOC_ptzNjFF!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNTNVt2CFZFCaSSVc-h6zWDCH-WPSOC_ptzNjFF%3Dw203-h100-k-no-pi-10-ya59-ro-0-fo100!7i4096!8i1420?entry=ttu"
              >
                <div className="text-lg">
                  <FaLocationDot />
                </div>
                <p>{contactInfo.address}</p>
              </a>
            </nav>
          </div>
        </div>
      </div>

      <nav className="mt-4 w-full">
        <ul className="flex justify-center gap-1">
          {socialMediaLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>
                <div className="text-3xl text-slate-50 transition-all duration-300 ease-in-out hover:scale-125">
                  {link.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mt-4 flex flex-col items-center justify-center text-center text-sm text-slate-400 md:flex-row md:gap-2">
        <Link className="hover:underline" href="/GDPR">
          Všeobecné obchodné podmienky
        </Link>
        &#8226;
        <Link className="hover:underline" href="/GDPR">
          Ochrana osobných údajov
        </Link>
        &#8226;
        <Link className="hover:underline" href="/GDPR">
          Cookies
        </Link>
      </nav>

      <div className="mx-auto mt-4 flex w-11/12 justify-between pb-1 text-sm text-slate-400">
        <div>
          <p>&#169; 2023 MoveLife</p>
        </div>
        <div>
          Vytvoril{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/marek-%C5%A1%C3%BAtora-9867b4269/"
          >
            Marek Šútora
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;