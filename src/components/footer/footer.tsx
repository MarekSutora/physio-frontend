import React from "react";
import { basicLinks, socialMediaLinks } from "@/lib/shared/constants";
import Link from "next/link";
import LogoImage from "../logo/logoImage";
import LogoText from "../logo/logoText";
import { IoIosMail } from "react-icons/io";
import { contactInfo } from "@/lib/shared/constants";
import { FaPhone, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-primarydk text-slate-50 md:pb-0">
      <div className="m-auto flex h-5/6 w-5/6 flex-col gap-3 md:flex-row md:justify-evenly">
        <nav className="mx-auto h-28 pb-3 w-20">
          <Link href="/" className="relative m-auto pt-1">
            <LogoImage
              fill="#ffffff"
              style={"w-20 absolute top-0 left-[-2.5rem]"}
            />
            <LogoText
              fill="#ffffff"
              style={"w-[135px] absolute left-[calc(-2.5rem-9px)]  top-[65px]"}
            />
          </Link>
        </nav>
        <div className="m-auto h-[1px] w-[100%] bg-slate-50 md:hidden"></div>
        <div>
          <p className="pb-3 text-center font-bold">NAVIGÁCIA</p>
          <nav>
            <ul className="text-md flex h-full flex-col gap-1 text-center md:text-left">
              {basicLinks.map(
                (link) =>
                  !link.subMenuItems && (
                    <li key={link.text}>
                      <Link className="hover:underline " href={link.path}>
                        {link.text}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </nav>
        </div>
        <div className="m-auto h-[1px] w-[60%] bg-slate-50 md:hidden"></div>
        <div className="flex flex-col items-center">
          <p className="pb-3 text-center font-bold">KONTAKT</p>
          <nav className="flex flex-col gap-1 px-8">
            <a
              className="flex items-center gap-1"
              href={`mailto:${contactInfo.email}`}
            >
              <div className="pt-[2px] text-lg">
                <IoIosMail />
              </div>
              {contactInfo.email}
            </a>
            <div className="flex items-center gap-1">
              <div className="pt-[2px] text-lg">
                <FaPhone />
              </div>
              {contactInfo.telephoneNumber}
            </div>
            <a
              className="flex items-center gap-1"
              href="https://www.google.com/maps/@78.2185899,15.5954893,3a,75y,70.19h,78.83t/data=!3m8!1e1!3m6!1sAF1QipNTNVt2CFZFCaSSVc-h6zWDCH-WPSOC_ptzNjFF!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNTNVt2CFZFCaSSVc-h6zWDCH-WPSOC_ptzNjFF%3Dw203-h100-k-no-pi-10-ya59-ro-0-fo100!7i4096!8i1420?entry=ttu"
            >
              <div className="pb-6 text-lg">
                <FaLocationDot />
              </div>
              <p>{contactInfo.address}</p>
            </a>
            <ul className="m-auto mt-2 flex h-full gap-1">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>
                    <div className="h-auto text-3xl text-slate-50 transition-all duration-300 ease-in-out hover:scale-125">
                      {link.icon}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <nav className="mt-4 flex flex-col items-center justify-center text-center text-sm text-slate-400 md:flex-row md:justify-center">
        <Link href="/GDPR">Všeobecné obchodné podmienky</Link>
        <Link href="/GDPR">Ochrana osobných údajov</Link>
        <Link href="/GDPR">Cookies</Link>
      </nav>
      <div className="mt-4 flex justify-evenly pb-1 text-sm text-slate-400">
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
