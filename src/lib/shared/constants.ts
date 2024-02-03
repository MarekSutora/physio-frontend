import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import React from "react";

export const basicLinks = [
  {
    text: "Služby",
    subMenuItems: [
      { text: "Služba 1aaaaaaa", path: "/" },
      { text: "Služba2aaaaaaa", path: "/" },
      { text: "Služba3aaaaaaa", path: "/" },
    ],
  },
  { text: "O mne", path: "/o-mne" },
  { text: "Rezervácia", path: "/rezervacie" },
  { text: "Blog", path: "/blog" },
];

export const userLinks = [
  { text: "Prihlásenie", path: "/prihlasenie" },
  { text: "Registrácia", path: "/registracia" },
] as const;

export const socialMediaLinks = [
  {
    icon: React.createElement(FaFacebook),
    path: "https://www.facebook.com/",
  },
  {
    icon: React.createElement(FaYoutube),
    path: "https://www.youtube.com/",
  },
  {
    icon: React.createElement(FaInstagram),
    path: "https://www.instagram.com/",
  },
] as const;

export const contactInfo = {
  email: "marek.sutora@gmail.com",
  telephoneNumber: "+421 123 456 789",
  address: "P. Sherman, 42 Wallaby Way, Sydney",
} as const;

export const dashboardLinks = {
  admin: [
    {
      text: "Prehľad",
      path: "/dashboard/prehlad",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Štatistiky",
      path: "/dashboard/statistiky",
      icon: React.createElement(FaFacebook),
    },
  ],
  physiotherapist: [
    {
      text: "Správa rezervácií",
      path: "/dashboard/sprava-rezervacii",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Správa pacientov",
      path: "/dashboard/sprava-pacientov",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Správa služieb",
      path: "/dashboard/sprava-sluzieb",
      icon: React.createElement(FaFacebook),
    },
  ],
  patient: [
    {
      text: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "My Profile",
      path: "/my-profile",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Support",
      path: "/support",
      icon: React.createElement(FaFacebook),
    },
  ],
} as const;

export const DesktopDashboardSectionStyle =
  "border-slate-200 bg-white p-2 md:rounded-lg md:border-2" as const;
