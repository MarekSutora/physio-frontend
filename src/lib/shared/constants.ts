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
  { text: "Rezervácia", path: "/rezervacia" },
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
  companyName: "Meno firmy s.r.o.",
  name: "Marek Šútora",
  email: "marek.sutora@gmail.com",
  telephoneNumber: "+421 123 456 789",
  address: "P. Sherman, 42 Wallaby Way",
  zip: "958 03",
  city: "Sydney",
} as const;

export const dashboardLinks = {
  admin: [
    {
      text: "Prehľad",
      path: "/dashboard/admin/prehlad",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Štatistiky",
      path: "/dashboard/admin/statistiky",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Správa rezervácií",
      path: "/dashboard/admin/sprava-rezervacii",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Blog",
      path: "/dashboard/admin/blog",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Správa pacientov",
      path: "/dashboard/admin/sprava-pacientov",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Správa služieb",
      path: "/dashboard/admin/sprava-sluzieb",
      icon: React.createElement(FaFacebook),
    },
  ],
  patient: [
    {
      text: "My Appointments",
      path: "/dashboard/client/my-appointments",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "My Profile",
      path: "/dashboard/client/my-profile",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Support",
      path: "/dashboard/client/support",
      icon: React.createElement(FaFacebook),
    },
  ],
} as const;

export const DesktopDashboardSectionStyle =
  "border-slate-200 bg-white p-2 md:rounded-lg md:border-2" as const;
